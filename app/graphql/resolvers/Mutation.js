// Mutation resolvers
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { models } from "../../models/index.js";
import encryptPassword from "../../helpers/encryptPassword.js";
import protectedAuth from "../protectedAuth.js";
import { pubsub } from "./pubsub.js";

config();

// Auth/user functions
async function signUp(parent, args) {
  try {
    const password = await encryptPassword(args.password);
    const newUser = new models.User({
      ...args,
      password: password,
      dob: new Date() //args.dob ? new Date(args.dob) : null
    });
    await newUser.save();
    return newUser;
  } catch (err) {
    throw new Error(err);
  }
};

async function login(parent, args, { res }) {
  try {
    const user = await models.User.findOne({ email: args.email });
    if (!user) {
      throw new Error("Invalid username or password.");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Invalid username or password.");
    }

    await models.User.findOneAndUpdate(
      { _id: user._id },
      { $set: { lastLogin: Date.now() } },
      { new: true }
    );

    const token = jwt.sign({
      userId: user._id,
      exp: Math.floor(Date.now() / 1000) + (60*60) // 1 hour expiry
    }, process.env.SECRET_KEY);

    // cookie settings for jwt
    const cookieOptions = {
      httpOnly: true,
      path: '/graphql',
      domain: '.localhost',
      expires: new Date(Math.floor(Date.now()) + (60*60*1000)),
      sameSite: 'None',
      secure: true
    };

    res.cookie('jwtPayload', token, cookieOptions);

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

async function logout(parent, args, context) {
  protectedAuth(context);
  try {
    const cookieOptions = {
      httpOnly: true,
      path: '/graphql',
      domain: '.localhost',
      expires: new Date(0),
      sameSite: 'None',
      secure: true
    };
  
    const token = "logout";
    context.res.cookie('jwtPayload', token, cookieOptions);
    return token;
  } catch (err) {
    throw new Error(err);
  }
};

// Chat functions
async function createChat(parent, args, context) {
  protectedAuth(context);
  try {
    // Only one DM per pair of users
    if (args.participants.length == 2) {
      const existingChat = await models.Chat.findOne({
        participants: { 
          $all: [args.participants[0], args.participants[1]], 
          $size: 2 
        }
      });

      if (existingChat) return existingChat;
    };
    
    const newChat = new models.Chat({
      ...args,
      name: args.name || args.participants 
    });
    await newChat.save();
  
    await models.User.updateMany(
      { username: { $in: newChat.participants } },
      { $push: {chats: newChat._id } }
    );

    newChat.participants.forEach((participant) => {
      console.log(participant)
      pubsub.publish('CHAT_CREATED' + participant, {
        chatCreated: {
          _id: newChat._id
        }
      });
    })

    return newChat;
  } catch (err) {
    throw new Error(err);
  }
};

async function sendMessage(parent, args, context) {
  protectedAuth(context);
  try {
    const chatId = args.chat;

    const updatedChat = await models.Chat.findByIdAndUpdate(chatId, {
      $push: {
        messages: {
          sender: args.sender,
          text: args.text
        }
      }
    }, { new: true, select: 'messages' });

    const newMessage = updatedChat.messages[updatedChat.messages.length - 1];
    const { sender, text, timestamp } = newMessage;
  
    pubsub.publish('MESSAGE_SENT' + chatId , {
      messageSent: {
        sender,
        text,
        timestamp,
      }
    });

  } catch (err) {
    throw new Error(err);
  }
};

export default {
  signUp,
  login,
  logout,
  createChat,
  sendMessage,
};

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
  const password = await encryptPassword(args.password);
  const newUser = new models.User({
    ...args,
    password: password,
    dob: new Date() //args.dob ? new Date(args.dob) : null
  });
  await newUser.save();
  return newUser;
};

async function login(parent, args, { res }) {
  
  const user = await models.User.findOne({ email: args.email });
  if (!user) {
    throw new Error("User not found.");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password.");
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
  
  console.log('user logged in');

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
};

async function logout(parent, args, context) {
  protectedAuth(context);
  //console.log(context.res)
  console.log('logging out...')

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
  console.log('logout successful...?')
  return token;
};

// Chat functions

async function createChat(parent, args) {
  const newChat = new models.Chat({
    ...args,
    name: args.name || args.participants 
  });
  await newChat.save();
  console.log('chat created')
  await models.User.updateMany(
    { username: { $in: args.participants } },
    { $push: {chats: newChat._id } }
  );
  
  return newChat;
};

async function sendMessage(parent, args) {
  const id = args.chat;
  console.log(args)
  await models.Chat.findByIdAndUpdate(id, {
    $push: {
      messages: {
        sender: args.sender,
        text: args.text
      }
    }
  });

  pubsub.publish('MESSAGE_SENT' + id , {
    messageSent: {
      sender: args.sender,
      text: args.text
    }
  });
  
  
}

export default {
  signUp,
  login,
  logout,
  createChat,
  sendMessage
};

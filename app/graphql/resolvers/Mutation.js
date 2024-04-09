// Mutation resolvers
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { models } from "../../models/index.js";
import encryptPassword from "../../helpers/encryptPassword.js";

config();

// cookie settings for jwt
const cookieOptions = {
  httpOnly: true,
  path: '/graphql',
  domain: 'localhost:3000',
  expires: new Date(Date.now() + 3600000),
  sameSite: 'None'
};

// Auth/user functions
async function signUp(parent, args) {
  const password = await encryptPassword(args.password);
  const newUser = new models.User({
    ...args,
    password: password,
    dob: new Date(args.dob)
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
  
  res.cookie('jwtPayload', token, cookieOptions);

  return user;
};

// Chat functions

async function createChat(parent, args) {
  const newChat = new models.Chat(args);
  await newChat.save();

  await models.User.updateMany(
    { _id: { $in: args.participants } },
    { $push: {chats: newChat._id } }
  );
  
  return newChat;
};

async function sendMessage(parent, args) {
  const id = args.chat
  await models.Chat.findByIdAndUpdate(id, {
    $push: {
      messages: {
        sender: args.sender,
        text: args.text
      }
    }
  });
  
}

export default {
  signUp,
  login,
  createChat,
  sendMessage
};

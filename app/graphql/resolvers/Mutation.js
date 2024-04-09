// Mutation resolvers
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { models } from "../../models/index.js";
import encryptPassword from "../../helpers/encryptPassword.js";

config();

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

async function login(parent, args) {
  const user = await models.User.findOne({ email: args.email });
  if (!user) {
    throw new Error("User not found.");
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password.");
  }

  const token = jwt.sign({
    userId: user._id,
    exp: Math.floor(Date.now() / 1000) + (60*60) // 1 hour expiry
  }, process.env.SECRET_KEY);

  return {
    token,
    user
  };
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



export default {
  signUp,
  login,
  createChat
};

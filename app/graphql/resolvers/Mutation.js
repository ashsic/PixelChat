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
  console.log(args);
  const user = await models.User.findOne({ email: args.email });
  if (!user) {
    throw new Error("User not found.");
  }
  console.log(user);
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password.");
  }

  const token = jwt.sign({
    userId: user._id,
    exp: Math.floor(Date.now() / 1000) + (60*60) // 1 hour expiry
  }, process.env.SECRET_KEY);

  console.log('logged in')
  return {
    token,
    user
  };
};

// Chat functions

async function createChat(parent, args) {
  console.log(args);
  let newChat = new models.Chat(args);
  await newChat.save();
  newChat = {
    ...newChat,
    participants: args.participants.map((p) => {return {id: p}}),
    id: newChat._id.toString(),
    name: args.name
  };
  console.log(newChat);
  return newChat;
};



export default {
  signUp,
  login,
  createChat
};

import mongoose from "mongoose";
import { config } from "dotenv";

import User from "./User.js";
import Post from "./Post.js";
import Chat from "./Chat.js";

config();

const connectDb = () => {
  const mongoDB = process.env.DB_URL || '';
  return mongoose.connect(mongoDB);
};

const models = {
  User,
  Post,
  Chat
};

export {
  connectDb,
  models
};

import mongoose from "mongoose";
import { config } from "dotenv";

import User from "./User";
import Post from "./Post";
import Chat from "./Chat";

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

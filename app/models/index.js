import mongoose from "mongoose";

import User from "./User.js";
import Post from "./Post.js";
import Chat from "./Chat.js";
import Comment from "./Comment.js";
import CommentReply from "./CommentReply.js";


const connectDb = () => {
  const mongoDB = process.env.DB_URL || '';
  return mongoose.connect(mongoDB);
};

const models = {
  User,
  Post,
  Chat,
  // Comment,
  // CommentReply
};

export {
  connectDb,
  models
};

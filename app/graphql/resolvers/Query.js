// Query resolvers
import protectedAuth from "../protectedAuth.js";
import { models } from "../../models/index.js";

async function user(parent, args, context) {
  try {
    protectedAuth(context);
    const user = await models.User.findById(args.id);
    return user;
  } catch (err) {
    throw new Error(err);
  }
}

async function users(parent, args, context) {
  try {
    protectedAuth(context);
    const allUsers = await models.User.find({});
    return allUsers;
  } catch (err) {
    return { success: false, message: err.message };
  }
}

async function userChats(parent, args, context) {
  try {
    protectedAuth(context);
    const chat = await models.Chat.findById(args.id);
    return chat;
  } catch (err) {
    throw new Error(err);
  }
}

async function verifyJwt(parent, args, context) {
  try {
    const userId = protectedAuth(context);
    const user = await models.User.findById(userId);
    return user;
  } catch (err) {
    return { success: false, message: err.message };
  }
}

async function post(parent, args, context) {
  try {
    protectedAuth(context);
    const postId = args.id;
    const post = await models.Post.findById(postId);
    return post;
  } catch (err) {
    return { success: false, message: err.message }; // this or throw error?
  }
}

async function posts(parent, args, context) {
  try {
    protectedAuth(context);
    const allPosts = await models.Post.find({});
    return allPosts;
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export default {
  user,
  users,
  userChats,
  verifyJwt,
  post,
  posts,
};

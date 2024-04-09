// Query resolvers
import protectedAuth from "../protectedAuth.js";
import { models } from "../../models/index.js";

async function user(parent, args, context) {
  protectedAuth(context);
  const user = await models.User.findById(args.id);
  return user;
}

async function users(parent, args, context) {
  try {
    protectedAuth(context);
    const users = await models.User.find({});
    return users;
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function userChats(parent, args, context) {
  protectedAuth(context);
  //console.log(context);
  const chats = await models.Chat.find(
    { _id: { $in: args.ids } }
  );

  return chats;
}

export default {
  user,
  users,
  userChats
};

// Query resolvers
import protectedAuth from "../protectedAuth.js";
import { models } from "../../models/index.js";

async function user(parent, args, context) {
  // protectedAuth(context);
  const user = await models.User.findById(args.id);
  return user;
}

async function users(parent, args, context) {
  protectedAuth(context);
  const users = await models.User.find({});
  return users;
}

export default {
  user,
  users
};

import { models } from "./models/index.js";
import mongoose from "mongoose";
import authHelper from "./helpers/authHelper.js";

const resolvers = {
  User: {
    id: (parent) => parent.id ?? parent._id,
  },
  Query: {
    async user(parent, args) {
      const user = await models.User.findById(args.id);
      return user;
    },
    async users() {
      const users = await models.User.find({});
      return users;
    }
  },
  Mutation: {
    async createUser(parent, args) {
      const hashedPassword = await authHelper(args.password);
      const newUser = new models.User({
        username: args.username,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        password: hashedPassword,
        dob: new Date(args.dob),
        bio: args.bio
      });
      await newUser.save();
      return newUser;
    }
  }
};

export default resolvers;

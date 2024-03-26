import { models } from "./models/index.js";
import mongoose from "mongoose";

const resolvers = {
  User: {
    id: (parent) => parent.id ?? parent._id,
  },
  Query: {
    async user(parent, args) {
      //console.log(args.id)
      const user = await models.User.findById(args.id);
      return user;
    },
    async users() {
      const users = await models.User.find({});
      //console.log(users)
      return users;
    }
  },
  Mutation: {
    async createUser(parent, args) {
      const newUser = new models.User({
        username: args.username,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        password: args.password,
        dob: new Date(args.dob),
        bio: args.bio
      });
      await newUser.save();
      return newUser;
    }
  }
};

export default resolvers;

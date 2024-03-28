import { config } from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { models } from "../models/index.js";
import authHelper from "../helpers/authHelper.js";
import protectedAuth from "./protectedAuth.js";

config();

const resolvers = {
  User: {
    _id: (parent) => parent.id ?? parent._id,
  },
  Query: {
    async user(parent, args) {
      protectedAuth(context);
      const user = await models.User.findById(args.id);
      return user;
    },
    async users(parent, args, context) {
      protectedAuth(context);
      const users = await models.User.find({});
      return users;
    }
  },
  Mutation: {
    async signUp(parent, args) {
      const password = await authHelper(args.password);
      const newUser = new models.User({
        ...args,
        password: password,
        dob: new Date(args.dob)
      });
      await newUser.save();
      return newUser;
    },
    async login(parent, args) {
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

      console.log('logged in')
      return {
        token,
        user
      };
    }
  }
};

export default resolvers;

import { models } from "./models/index.js";
import authHelper from "./helpers/authHelper.js";

import { config } from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

config();

// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.SECRET, 
//   algorithms: ['RS256']
// };


// passport.use(new Strategy(function verify(username, password, cb) {
  
// }));




const resolvers = {
  User: {
    _id: (parent) => parent.id ?? parent._id,
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
    async login(parent, args, context, info) {
      console.log(context)
      const user = await models.User.findOne({ email: args.email });
      if (!user) {
        throw new Error("User not found.");
      }
      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error("Invalid password.");
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      console.log('logged in', token)
      return {
        token,
        user
      };
    }
  }
};

export default resolvers;

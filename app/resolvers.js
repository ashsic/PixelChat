import { models } from "./models/index.js";
import authHelper from "./helpers/authHelper.js";
import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";

passport.use(new Strategy(function verify(username, password, cb) {
  
}))

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
    async signUp(parent, args) {
      const password = await authHelper(args.password);
      const newUser = new models.User({
        ...args,
        password: password,
        dob: new Date(args.dob)
      });
      await newUser.save();
      return newUser;
    }
  }
};

export default resolvers;

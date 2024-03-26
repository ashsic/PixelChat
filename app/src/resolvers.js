import { models } from "../models/index";

const resolvers = {
  User: {
    id: (parent) => parent.id ?? parent._id,
  },
  Query: {
    async user(parent, args) {
      const user = await models.User.find({ _id: args.id });
      return res.send(user);
    },
    async users() {
      const users = await models.User.find({});
      return res.send(users);
    }
  },
  Mutation: {
    async createUser(parent, args) {
      const newUser = {
        username: args.username,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        password: args.password,
        dob: args.dob,
        bio: args.bio
      };
      await newUser.save();
      return resolvers.send(newUser);
    }
  }
};

export default resolvers;

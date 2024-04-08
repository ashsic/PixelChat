import User from "./resolvers/User.js";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Chat from "./resolvers/Chat.js";

const resolvers = {
  User,
  Chat,
  Query,
  Mutation
};

export default resolvers;

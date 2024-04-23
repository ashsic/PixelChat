import User from "./resolvers/User.js";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Chat from "./resolvers/Chat.js";
import Subscription from "./resolvers/Subscription.js";

const resolvers = {
  User,
  Chat,
  Query,
  Mutation,
  Subscription
};

export default resolvers;

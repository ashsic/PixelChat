// Subscription resolvers
import protectedAuth from "../protectedAuth.js";
import { models } from "../../models/index.js";
import { pubsub } from "./pubsub.js";

export default {
  messageSent : {
    subscribe: (_, args) =>  pubsub.asyncIterator(['MESSAGE_SENT' + args.id])
  }
};

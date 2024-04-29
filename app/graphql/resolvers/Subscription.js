// Subscription resolvers
import { pubsub } from "./pubsub.js";

export default {
  messageSent: {
    subscribe: (_, args) =>  pubsub.asyncIterator(['MESSAGE_SENT' + args.id])
  }
};

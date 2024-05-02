// Subscription resolvers
import { pubsub } from "./pubsub.js";

export default {
  messageSent: {
    subscribe: (_, args) => pubsub.asyncIterator(['MESSAGE_SENT' + args.id])
  },
  chatCreated: {
    subscribe: (_, args) =>  { 
      console.log(['CHAT_CREATED'+ args.id])
      console.log(args)
      return pubsub.asyncIterator(['CHAT_CREATED'+ args.id])
    }
  }
};

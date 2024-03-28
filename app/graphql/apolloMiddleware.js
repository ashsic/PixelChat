import { expressMiddleware } from '@apollo/server/express4';
import { getTokenData } from '../helpers/jwtHelper.js';

const apolloMiddleware = (server) => {
  return expressMiddleware(server, {
    context: async ({ req }) => ({
      ...req,
      tokenPayload:
        req && req.headers.authorization
          ? getTokenData(req)
          : null
    })
  });
};

export default apolloMiddleware;

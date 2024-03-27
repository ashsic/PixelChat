import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

function getTokenPayload(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}

function getTokenData(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const { userId, exp, iat } = getTokenPayload(token);
      return { userId, exp, iat };
    }
  } else if (authToken) {
    const { userId, exp, iat } = getTokenPayload(authToken);
    return { userId, exp, iat };
  }

  throw new Error('Not authenticated');
}

export {
  getTokenData
};

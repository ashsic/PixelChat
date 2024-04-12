import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

function getTokenPayload(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}

function getTokenData(req) {
  if (req) {
    const cookies = req.cookies
    if (cookies) {
      const token = cookies.jwtPayload;
      if (token) {
        try {
          const { userId, exp, iat } = getTokenPayload(token);
          return { userId, exp, iat };
        } catch (error) {
          return null;
        }
      } 
    }
  }
  return null;
}

export {
  getTokenData
};

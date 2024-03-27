import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { connectDb } from "./models/index.js";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';

import { getTokenData } from "./helpers/jwtHelper.js";

config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apollo server
const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers
  }),
});

await server.start();

// Route
app.use("/graphql",
  expressMiddleware(server, {
    context: async ({ req }) => ({
      ...req,
      tokenPayload:
        req && req.headers.authorization
          ? getTokenData(req)
          : null
    })
  }),
);

// Start db, express
connectDb().then(() => {
  console.log("Connected to MongoDB.");

  app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

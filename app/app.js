import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { connectDb } from "./models/index.js";

import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/index.js";
import apolloMiddleware from "./graphql/apolloMiddleware.js";

import cookieParser from "cookie-parser";

config();

// Create express server, set port
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true 
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use((req, res, next) => {
  console.log('cookies',req.cookies)
  next()
})

// Apollo server
const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers
  }),
});

await server.start();

// Route w/ middleware
app.use("/graphql", apolloMiddleware(server));

// Start db, express
connectDb().then(() => {
  console.log("Connected to MongoDB.");

  app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

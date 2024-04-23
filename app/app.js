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

import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

config();

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create express server, http server, websocket server
const app = express();
const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

// Route w/ middleware
const corsOptions = {
  origin: `.localhost`, //'http://localhost:5173',
  credentials: true 
};

app.use("/graphql", 
  cors(corsOptions), 
  express.json(), 
  express.urlencoded({ extended: false }),
  cookieParser(), 
  apolloMiddleware(server)
);

const port = process.env.PORT || 3000;

// Start db, express
connectDb().then(() => {
  console.log("Connected to MongoDB.");

  httpServer.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/graphql.`);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});


// Middleware
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser())

// app.use((req, res, next) => {
//   console.log('cookies',req.cookies)
//   next()
// })

// Apollo server
// const server = new ApolloServer({
//   schema: buildSubgraphSchema({
//     typeDefs,
//     resolvers
//   }),
// });
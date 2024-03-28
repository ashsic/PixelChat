import { readFileSync } from "fs";
import gql from "graphql-tag";

// Separates the typedefs, imports from app.js
const typeDefs = gql(
  readFileSync("./graphql/schema.graphql", {
    encoding: "utf-8",
  })
);

export default typeDefs;

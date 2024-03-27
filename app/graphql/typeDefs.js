import { readFileSync } from "fs";
import gql from "graphql-tag";

const typeDefs = gql(
  readFileSync("./graphql/schema.graphql", {
    encoding: "utf-8",
  })
);

export default typeDefs;

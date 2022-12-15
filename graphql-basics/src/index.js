import { GraphQLServer } from "graphql-yoga";
import db from "./db";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Commnet";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
  },
  context: { db },
});

server.start(() => {
  console.log("Server is up and running on default port 4000");
});

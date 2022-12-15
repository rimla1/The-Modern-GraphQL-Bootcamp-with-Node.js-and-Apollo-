import { GraphQLServer } from "graphql-yoga";
import { UserService } from "./userService";
import { v4 as uuidv4 } from "uuid";
import db from "./db";

const userService = new UserService();

// Resolvers
const resolvers = {};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { db },
});

server.start(() => {
  console.log("Server is up and running on default port 4000");
});

// Mutaciju: Comments Posts
// Query: comments: [], posts: []

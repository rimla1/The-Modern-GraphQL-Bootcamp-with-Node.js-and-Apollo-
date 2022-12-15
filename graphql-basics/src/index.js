import { GraphQLServer } from "graphql-yoga";
import { UserService } from "./userService";
import { v4 as uuidv4 } from "uuid";
import db from "./db";

const userService = new UserService();

// Resolvers
const resolvers = {
  Comment: {
    author(parent, ags, { db }, info) {
      // data loaderi
      return db.users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, { db }, info) {
      return db.posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
};

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

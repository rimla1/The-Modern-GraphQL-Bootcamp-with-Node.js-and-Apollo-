import { GraphQLServer } from "graphql-yoga";
import { UserService } from "./userService";
import { v4 as uuidv4 } from "uuid";
import db from "./db";

const userService = new UserService();

// Resolvers
const resolvers = {
  Post: {
    author(parent, args, { db }, info) {
      return db.users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
    premium(parent, args, { db }, info) {
      return { id: "1", isPremium: true };
    },
  },

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

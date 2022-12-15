import { GraphQLServer } from "graphql-yoga";
import { UserService } from "./userService";
import { v4 as uuidv4 } from "uuid";
import db from "./db";

const userService = new UserService();

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, { db }, info) {
      if (!args.letter) {
        return db.users;
      }
      return db.users.filter((user) => {
        return user.name.toLowerCase().includes(args.letter.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.letter) {
        return posts;
      }
      return posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.letter.toLowerCase()) ||
          post.body.toLowerCase().includes(args.letter.toLowerCase())
        );
      });
    },
    user(parent, args, ctx, info) {
      const user = userService.getUserById(args.userId);
      return user;
    },
    me() {
      return {
        id: "2555",
        name: "Almir",
        email: "test@gmail.com",
        age: 20,
      };
    },
    post() {
      return {
        id: "4333",
        title: "Winter",
        body: "Nice mountains with a lot of snow",
        published: true,
        author: "1",
      };
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email);
      if (emailTaken) {
        throw new Error("User with that email already exists");
      }
      const userId = uuidv4();

      const user = {
        id: userId,
        ...args.data,
      };

      users.push(user);

      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex((user) => user.id === args.id);
      if (userIndex === -1) {
        throw new Error("User does not exist!");
      }

      const deletedUsers = users.splice(userIndex, 1);

      posts = posts.filter((post) => {
        const match = post.author === args.id;
        if (match) {
          comments = comments.filter((comment) => comment.post !== post.id);
        }
        return !match;
      });

      comments = comments.filter((comment) => {
        return comment.author !== args.id;
      });

      return deletedUsers[0];
    },
    createPost(parent, args, ctx, info) {
      const userExist = users.some((user) => user.id === args.data.author);
      if (!userExist) {
        throw new Error("User not found associated with a post!");
      }

      const post = {
        id: uuidv4(),
        ...args.data,
      };
      posts.push(post);

      return post;
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex((post) => post.id === args.id);
      if (postIndex === -1) {
        throw new Error("Post does not exists");
      }
      const deletedPosts = posts.splice(postIndex, 1);

      comments = comments.filter((comment) => comment.post !== args.id);

      return deletedPosts[0];
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      const postExists = posts.some((post) => {
        return post.id === args.data.post && post.published === true;
      });
      if (!userExists || !postExists) {
        throw new Error(
          "Comment does not have author or comment does not have post to be published"
        );
      }

      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      comments.push(comment);
      return comment;
    },
    deleteComment(parent, args, ctx, info) {
      const commentIndex = comments.findIndex(
        (comment) => comment.id === args.id
      );
      if (commentIndex === -1) {
        throw new Error("Comment does not exist");
      }
      const deletedComments = comments.splice(commentIndex, 1);

      return deletedComments[0];
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
    premium(parent, args, ctx, info) {
      return { id: "1", isPremium: true };
    },
  },

  Comment: {
    author(parent, ags, ctx, info) {
      // data loaderi
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
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

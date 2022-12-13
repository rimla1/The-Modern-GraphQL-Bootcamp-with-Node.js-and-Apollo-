import { GraphQLServer } from "graphql-yoga";
import { UserService } from "./userService";
import { v4 as uuidv4 } from "uuid";

const users = [
  {
    id: "1",
    name: "Almir",
    email: "test@gmail.com",
    age: 20,
  },
  {
    id: "2",
    name: "John",
    email: "test2@gmail.com",
    age: 22,
  },
  {
    id: "3",
    name: "Rimla",
    email: "test3@gmail.com",
    age: 22,
  },
];

const posts = [
  {
    id: "1",
    title: "Winter",
    body: "Nice mountains with a lot of snow",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "Spring",
    body: "Nice flavour of flowers",
    published: false,
    author: "1",
  },
  {
    id: "3",
    title: "Summer",
    body: "Swim at the pool",
    published: false,
    author: "3",
  },
];

console.log(posts);

const comments = [
  {
    id: "1",
    text: "That's awesome mountains over there",
    author: "2",
    post: "1",
  },
  {
    id: "2",
    text: "Kopaonik is better than that mountain. LOL!",
    author: "2",
    post: "1",
  },
  {
    id: "3",
    text: "Is is cool there?",
    author: "3",
    post: "1",
  },
  {
    id: "4",
    text: "Nice swimming pool",
    author: "1",
    post: "3",
  },
];

// Type Definitions (Scema)
const typeDefs = `
    type Query {
        users(letter: String): [User!]!
        me: User!
        user(userId: String!): User!
        post: Post!
        posts(letter: String): [Post!]!
        comments: [Comment!]!
    }

    type Mutation {
      createUser(name: String!, email: String!, age: Int): User!
      createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
      createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type Premium {
      id: ID!
      isPremium: Boolean!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]! 
        comments: [Comment!]!
        premium: Premium!
    }



    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
    }
`;

//

const userService = new UserService();

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.letter) {
        return users;
      }
      return users.filter((user) => {
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
      const emailTaken = users.some((user) => user.email === args.email);
      if (emailTaken) {
        throw new Error("User with that email already exists");
      }
      const userId = uuidv4();
      const user = {
        id: userId,
        name: args.name,
        email: args.email,
        age: args.age,
      };

      users.push(user);

      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExist = users.some((user) => user.id === args.author);
      if (!userExist) {
        throw new Error("User not found associated with a post!");
      }

      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author,
      };
      posts.push(post);

      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.author);
      const postExists = posts.some((post) => post.id === args.post);
      if (!userExists || !postExists) {
        throw new Error(
          "Comment does not have author or comment does not have post to be published"
        );
      }

      const comment = {
        id: uuidv4(),
        text: args.text,
        author: args.author,
        post: args.post,
      };

      comments.push(comment);
      return comment;
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
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server is up and running on default port 4000");
});

// Mutaciju: Comments Posts
// Query: comments: [], posts: []

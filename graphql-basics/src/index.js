import { GraphQLServer } from "graphql-yoga";

// Type Definitions (Scema)
const typeDefs = `
    type Query {
        users: [User!]!
        me: User!
        post: Post!
        posts: [Post!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    users() {
      return [
        {
          id: "2555",
          name: "Almir",
          email: "test@gmail.com",
          age: 20,
        },
        {
          id: "1122",
          name: "Rimla",
          email: "test2@gmail.com",
          age: 22,
        },
      ];
    },
    posts() {
      return [
        {
          id: "4333",
          title: "Winter",
          body: "Nice mountains with a lot of snow",
          published: true,
        },
        {
          id: "2265",
          title: "Spring",
          body: "Nice flavour of flowers",
          published: false,
        },
      ];
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
      };
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

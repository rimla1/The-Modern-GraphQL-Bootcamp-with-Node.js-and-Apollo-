import { GraphQLServer } from "graphql-yoga";

// Type Definitions (Scema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
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

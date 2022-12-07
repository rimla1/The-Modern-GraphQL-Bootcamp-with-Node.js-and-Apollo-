import { GraphQLServer } from "graphql-yoga";

// Type Definitions (Scema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        age: String!
        location: String!
        bio: String!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "This is my first query";
    },
    name() {
      return "Almir";
    },
    age() {
      return "20";
    },
    bio() {
      return "I am programmer, nice to meet you!";
    },
    location() {
      return "I am from Novi Pazar..";
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

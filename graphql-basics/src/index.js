import { GraphQLServer } from "graphql-yoga";

// Type Definitions (Scema)
const typeDefs = `
    type Query {
        name: String!
        year: Int!
        isOpen: Boolean!
        id: ID!
        rating: Float
    }
`;

// Resolvers
const resolvers = {
  Query: {
    name() {
      return "Hotel Rimla";
    },
    year() {
      return 2002;
    },
    isOpen() {
      return true;
    },
    rating() {
      return 4.2;
    },
    id() {
      return "a2-b4-77-12-nnn";
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

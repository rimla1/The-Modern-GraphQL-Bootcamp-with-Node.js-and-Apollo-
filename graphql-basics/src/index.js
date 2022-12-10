import { GraphQLServer } from "graphql-yoga";

// Type Definitions (Scema)
const typeDefs = `
    type Query {
        addNNumbers(numbers: [Float!]!): Float!
        addTwoNumbers(a: Float!, b: Float!): Float!
        greeting(name: String, position: String): String!
        grades: [Int!]!
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
    addNNumbers(parent, args, ctx, info) {
      let result = 0;
      for (let i = 0; i < args.numbers.length; i++) {
        result += args.numbers[i];
      }
      return result;
    },
    addTwoNumbers(parent, args, ctx, info) {
      return args.a + args.b;
    },
    greeting(parent, args, ctx, info) {
      if (!args.name && !args.position) {
        return "Hello!";
      }
      return `Hello, ${args.name}! You are my favourite ${args.position}`;
    },
    grades(parent, args, ctx, info) {
      return [99, 75, 50, 49, 10];
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

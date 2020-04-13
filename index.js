const GraphQlYoga = require("graphql-yoga");

const { prisma } = require("./generated/prisma-client");
const resolvers = require("./schema/index");

const { GraphQLServer } = GraphQlYoga;

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => {
  console.log("Server is running on http://localhost:4000");
});

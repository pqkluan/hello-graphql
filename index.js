const GraphQlYoga = require("graphql-yoga");
const cors = require("cors");

const { prisma } = require("./generated/prisma-client");
const resolvers = require("./src/resolvers");

const { GraphQLServer } = GraphQlYoga;

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: { prisma }
});

server.express.use(cors());

server.start(() => {
  console.log("Server is running");
});

const GraphQlYoga = require("graphql-yoga");

const { prisma } = require("./generated/prisma-client");
const resolvers = require("./src/resolvers");

const { GraphQLServer } = GraphQlYoga;

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: { prisma }
});

server.express.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://hello-next.pqkluan.now.sh");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.start(() => {
  console.log("Server is running on http://localhost:4000");
});

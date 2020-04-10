const graphql = require("graphql");

const booksSchema = require("./books.js");

const { GraphQLSchema, GraphQLObjectType } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields() {
    return {
      ...booksSchema.queries(),
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields() {
    return {
      ...booksSchema.mutations(),
    };
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

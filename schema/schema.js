import graphql from "graphql";

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const books = [
  { id: "1", name: "A", genre: "Good", authorId: "1" },
  { id: "11", name: "AA", genre: "Bad", authorId: "1" },
  { id: "2", name: "B", genre: "Bad", authorId: "2" },
  { id: "22", name: "BB", genre: "Ugly", authorId: "2" },
  { id: "3", name: "C", genre: "Ugly", authorId: "3" },
  { id: "33", name: "CC", genre: "Good", authorId: "3" },
];

const authors = [
  { id: "1", name: "Mr.A", age: 10 },
  { id: "2", name: "Mr.B", age: 20 },
  { id: "3", name: "Mr.C", age: 30 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields() {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
        type: AuthorType,
        resolve(parent, args) {
          return authors.find((author) => author.id === parent.authorId);
        },
      },
    };
  },
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields() {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
          return books.filter((book) => book.authorId === parent.id);
        },
      },
    };
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields() {
    return {
      books: {
        type: new GraphQLList(BookType),
        resolve() {
          return books;
        },
      },
      book: {
        type: BookType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          // TODO: access data from DB
          return books.find((book) => book.id === args.id);
        },
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve() {
          return authors;
        },
      },
      author: {
        type: AuthorType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          // TODO: access data from DB
          return authors.find((author) => author.id === args.id);
        },
      },
    };
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});

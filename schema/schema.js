import graphql from "graphql";

import AuthorModel from "../models/author.js";
import BookModel from "../models/book.js";

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

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
          return AuthorModel.findById(parent.authorId);
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
          return BookModel.find({ authorId: parent.id });
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
          return BookModel.find({});
        },
      },
      book: {
        type: BookType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return BookModel.findById(args.id);
        },
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve() {
          return AuthorModel.find({});
        },
      },
      author: {
        type: AuthorType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return AuthorModel.findById(args.id);
        },
      },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields() {
    return {
      addAuthor: {
        type: AuthorType,
        args: {
          age: { type: new GraphQLNonNull(GraphQLInt) },
          name: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, args) {
          const { name, age } = args;
          const author = new AuthorModel({ name, age });
          return author.save();
        },
      },
      addBook: {
        type: BookType,
        args: {
          authorId: { type: new GraphQLNonNull(GraphQLID) },
          genre: { type: new GraphQLNonNull(GraphQLString) },
          name: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, args) {
          const { authorId, name, genre } = args;
          const book = new BookModel({ authorId, genre, name });
          return book.save();
        },
      },
      removeBook: {
        type: BookType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          const { id } = args;
          return BookModel.findByIdAndDelete(id);
        },
      },
    };
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

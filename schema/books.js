const graphql = require("graphql");

// const models = require("../db/models");

const {
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
          return models.Author.findOne({
            where: { id: parent.authorId },
          });
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
          return models.Book.findAll({ where: { authorId: parent.id } });
        },
      },
    };
  },
});

function queries() {
  return {
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return models.Book.findAll({});
      },
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return models.Book.findOne({ where: { id: args.id } });
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return models.Author.findAll({});
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return models.Author.findOne({ where: { id: args.id } });
      },
    },
  };
}

function mutations() {
  return {
    addAuthor: {
      type: AuthorType,
      args: {
        age: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const { name, age } = args;
        return models.Author.create({ name, age });
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
        return models.Book.create({ authorId, genre, name });
      },
    },
    removeBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { id } = args;
        return models.Book.destroy({ where: { id } });
      },
    },
  };
}

module.exports = {
  queries,
  mutations,
};

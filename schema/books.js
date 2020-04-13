const graphql = require("graphql");
const Prisma = require("@prisma/client");

const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

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
          return prisma.author.findOne({ where: { id: parent.authorId } });
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
          return prisma.book.findMany({ where: { authorId: parent.id } });
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
        return prisma.book.findMany({});
      },
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return prisma.book.findOne({ where: { id: args.id } });
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return prisma.author.findMany({});
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return prisma.author.findOne({ where: { id: args.id } });
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
        return prisma.author.create({ data: { name, age } });
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

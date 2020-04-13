module.exports = {
  Query: {
    book(root, args, context) {
      const { id } = args;
      return context.prisma.book({ id });
    },
    books(root, args, context) {
      return context.prisma.books({});
    },
    author(root, args, context) {
      const { id } = args;
      return context.prisma.author({ id });
    },
    authors(root, args, context) {
      return context.prisma.authors({});
    },
  },
  Mutation: {
    addAuthor(root, args, context) {
      const { name, age } = args;
      return context.prisma.createAuthor({ name, age });
    },
    updateAuthor(root, args, context) {
      const { id, name, age } = args;
      return context.prisma.updateAuthor({
        where: { id },
        data: { name, age },
      });
    },
    addBook(root, args, context) {
      const { authorId, name, genre } = args;
      return context.prisma.createBook({
        name,
        genre,
        author: { connect: { id: authorId } },
      });

      // return context.prisma.updatePost({
      //   where: { id: args.postId },
      //   data: { published: true },
      // });
    },
    removeBook(root, args, context) {
      const { id } = args;
      return context.prisma.deleteBook({ id });
    },
  },
  Author: {
    books(root, args, context) {
      const { id } = root;
      return context.prisma.author({ id }).books();
    },
  },
  Book: {
    author(root, args, context) {
      const { id } = root;
      return context.prisma.book({ id }).author();
    },
  },
};

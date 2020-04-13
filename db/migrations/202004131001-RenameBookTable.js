module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.dropTable("Books");

    return queryInterface.createTable("Book", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      genre: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      authorId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
    });
  },
  down(queryInterface, Sequelize) {
    return;
  },
};

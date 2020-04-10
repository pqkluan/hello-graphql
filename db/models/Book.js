module.exports = function (sequelize, DataTypes) {
  return sequelize.define("Book", {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    genre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    authorId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  });
};

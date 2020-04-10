module.exports = {
  development: {
    username: "express-mvp-dbuser",
    password: "123.456",
    database: "express-mvp-db",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5432,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "squwsnew",
    password: "4rWu2XPlhC-OuzvqrxQdZeXcvs28F0we",
    database: "squwsnew",
    host: "satao.db.elephantsql.com",
    dialect: "postgres",
    port: 5432,
  },
};

require("dotenv").config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mariadb",
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: "database_test",
    host: process.env.DB_HOST || "localhost",
    dialect: "sqlite",
    storage: ":memory"
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: "database_production",
    host: process.env.DB_HOST || "localhost",
    dialect: "mariadb",
  },
};
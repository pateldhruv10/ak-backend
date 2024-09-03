require("dotenv").config();

/**
 *  Sequelize Configuration
 */

module.exports = {
  development: {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    migrationStorageTableName: "sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_meta",
  },
  test: {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    migrationStorageTableName: "sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_meta",
  },
  production: {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    migrationStorageTableName: "sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_meta",
  },
};

//NPM Imports
import { Dialect, Sequelize } from "sequelize";
import { config } from "dotenv";

config();

/**
 * SEQUELIZE DATABASE CONNECTION
 */
const sequelize: Sequelize = new Sequelize(
  process?.env?.DB_NAME || "akinfotech",
  process?.env?.DB_USERNAME || "root",
  process?.env?.DB_PASSWORD || "",
  {
    host: process?.env?.DB_HOST || "localhost",
    port: Number(process?.env?.DB_PORT) || 3306,
    dialect: (process?.env?.DB_CONNECTION as Dialect) || "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: true,
  },
);

export { sequelize };

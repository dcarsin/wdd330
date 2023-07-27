import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
dotenv.config();

export const sequelizeDB = new Sequelize(
  process.env.DBASE,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: "mysql",
    models: [__dirname + "/../entity"],
    sync: { force: false, alter: false },
    query: { raw: false },
  }
);

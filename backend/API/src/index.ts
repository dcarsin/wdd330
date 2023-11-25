import "reflect-metadata";

import * as dotenv from "dotenv";

import { useContainer } from "routing-controllers";
import { Container } from "typedi";
import app from "./app";

import { sequelizeDB } from "./config/database";
dotenv.config();

async function createServer(): Promise<any> {
  try {
    useContainer(Container);
    await sequelizeDB.authenticate();
    const port = process.env.PORT || 4200;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error(error);
  }
}

createServer();

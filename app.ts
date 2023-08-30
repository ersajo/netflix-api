import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./src/helpers/logger";
import { db } from "./src/db";
import apiV1 from "./src/routes/v1";

dotenv.config();

class Server {
  app = express();
  port = process.env.PORT ?? 3000;

  applyMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/v1', apiV1);
  }

  start() {
    this.applyMiddlewares();
    this.app.listen(this.port, async () => {
      logger.log(`🚀 [server] Server is running at http://localhost:${this.port}`);
      await db.init();
    });
  }
}

export const server = new Server();
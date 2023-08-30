import { MongoClient }  from "mongodb";
import { logger } from "../helpers/logger";

const URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017";

export class DB {
  client;

  constructor() {
    this.client = new MongoClient(URI);
  }

  async init() {
    try {
      logger.log("🚀 [db] Database is ready");
      await this.client.connect();
    } catch (error: any) {
      logger.error(`📍 [db] Error: ${error.message}`);
    }
  }
}

export const db = new DB();
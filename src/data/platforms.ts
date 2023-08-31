import { ObjectId } from "mongodb";
import { IPlatform } from "../models";

export interface IPlatformsDb {
  getPlatform: (query: any) => Promise<IPlatform>;
  insertPlatform: (platform: IPlatform) => Promise<IPlatform>;
}

const COLLECTION = 'platforms';

export const buildPlatformsDb = ({
  db,
}: {
  db: any;
}): IPlatformsDb => {
  const getPlatform = async (
    query: any,
  ): Promise<IPlatform> => {
    const { client } = db;
    const platform = await client
      .db()
      .collection(COLLECTION)
      .findOne(query);
    return platform;
  }

  const insertPlatform = async (
    platform: IPlatform,
  ): Promise<IPlatform> => {
    const { client } = db;
    const { insertedId } = await client
      .db()
      .collection(COLLECTION)
      .insertOne(platform);
    const insertedPlatform = await getPlatform({ _id: new ObjectId(insertedId) });
    return insertedPlatform;
  }

  return {
    getPlatform,
    insertPlatform,
  }
}
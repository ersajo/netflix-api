import { IPlatformsDb } from "../../data/platforms";
import { IPlatform } from "../../models";

export type ICreatePlatform = (
  platform: IPlatform,
) => Promise<IPlatform>;

export const buildCreatePlatforms = ({
  platformsDb
}: {
  platformsDb: IPlatformsDb
}): ICreatePlatform => {
  return async (platform: IPlatform): Promise<IPlatform> => {
    platform.createdAt = new Date().toISOString();
    platform.updatedAt = platform.createdAt;
    const platforms = await platformsDb.insertPlatform(platform);

    return platforms;
  }
}
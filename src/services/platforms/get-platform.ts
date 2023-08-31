import { IPlatformsDb } from "../../data/platforms";
import { IPlatform } from "../../models";

export type IGetPlatform = (
  query: any,
) => Promise<IPlatform>;

export const buildGetPlatform = ({
  platformsDb
}: {
  platformsDb: IPlatformsDb
}): IGetPlatform => {
  return async (query: any): Promise<IPlatform> => {
    const platforms = await platformsDb.getPlatform(query);

    return platforms;
  }
}
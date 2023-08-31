import { ObjectId } from "mongodb";
import { StatusCodes } from "http-status-codes";
import { IGetMovie } from "../../services/movies/get-movie";

import { IControllerResponse } from "..";
import { IHttpRequest } from "../../helpers/callback";
import { IGetPlatform } from "../../services/platforms/get-platform";

export const buildGetMovie = ({
  getMovie,
  getPlatform,
}: {
  getMovie: IGetMovie,
  getPlatform: IGetPlatform,
}) => {
  return async (request: Partial<IHttpRequest>): Promise<IControllerResponse> => {
    try {
      const { params } = request;
      if (!params?.id) {
        throw new Error("You must supply an id.");
      }
      const movie = await getMovie({_id: new ObjectId(params.id)});

      movie.platforms = await Promise.all(
        movie.platforms.map(async (platform: any) => {
          const platformFound = await getPlatform({ _id: platform.platform_id});
          return platformFound;
        })
      );

      return {
        success: true,
        statusCode: StatusCodes.OK,
        body: {
          movie,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          error: error.message,
        },
      };
    }
  }
}
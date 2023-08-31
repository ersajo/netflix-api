import { StatusCodes } from "http-status-codes";
import { IGetMovies } from "../../services/movies/get-movies";

import { IControllerResponse } from "..";
import { IGetPlatform } from "../../services/platforms/get-platform";

export const buildGetMovies = ({
  getMovies,
  getPlatform,
}: {
  getMovies: IGetMovies,
  getPlatform: IGetPlatform,
}) => {
  return async (): Promise<IControllerResponse> => {
    try {
      const movies = await getMovies({}, null, {_id: -1});

      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        if (!movie.platforms) movie.platforms = [];
        movie.platforms = await Promise.all(
          movie.platforms.map(async (platform: any) => {
            const platformFound = await getPlatform({ _id: platform.platform_id});
            return platformFound;
          }
        ));
      }

      return {
        success: true,
        statusCode: StatusCodes.OK,
        body: {
          movies,
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
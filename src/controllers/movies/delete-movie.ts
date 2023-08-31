import { StatusCodes } from "http-status-codes";
import { IDeleteMovie } from "../../services/movies/delete-movie";

import { IControllerResponse } from "..";
import { IHttpRequest } from "../../helpers/callback";
import { IGetPlatform } from "../../services/platforms/get-platform";

export const buildDeleteMovie = ({
  deleteMovie,
  getPlatform,
}: {
  deleteMovie: IDeleteMovie,
  getPlatform: IGetPlatform,
}) => {
  return async (request: Partial<IHttpRequest>): Promise<IControllerResponse> => {
    try {
      const { params } = request;
      if (!params?.id) {
        throw new Error("You must supply an id.");
      }
      const deletedMovie = await deleteMovie(params.id);

      deletedMovie.platforms = await Promise.all(
        deletedMovie.platforms.map(async (platform: any) => {
          const platformFound = await getPlatform({ _id: platform.platform_id});
          return platformFound;
        })
      );

      return {
        success: true,
        statusCode: StatusCodes.OK,
        body: {
          movie: deletedMovie,
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
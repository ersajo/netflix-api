import { StatusCodes } from "http-status-codes";
import { IUpdateMovie } from "../../services/movies/update-movie";

import { IControllerResponse } from "..";
import { IHttpRequest } from "../../helpers/callback";
import { IGetPlatform } from "../../services/platforms/get-platform";
import { IGetMovie } from "../../services/movies/get-movie";
import { ObjectId } from "mongodb";

export const buildUpdateMovie = ({
  updateMovie,
  getPlatform,
  getMovie,
}: {
  updateMovie: IUpdateMovie,
  getPlatform: IGetPlatform,
  getMovie: IGetMovie,
}) => {
  return async (request: Partial<IHttpRequest>): Promise<IControllerResponse> => {
    try {
      const { params, body } = request;
      if (!params?.id) {
        throw new Error("You must supply an id.");
      }
      const movie = await getMovie({ _id: new ObjectId(params.id) });
      if (!movie) {
        throw new Error("Movie not found.");
      }
      const updatedMovie = await updateMovie(params.id, body);

      updatedMovie.platforms = await Promise.all(
        updatedMovie.platforms.map(async (platform: any) => {
          const platformFound = await getPlatform({ _id: platform.platform_id});
          return platformFound;
        })
      );

      return {
        success: true,
        statusCode: StatusCodes.OK,
        body: {
          movie: updatedMovie,
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
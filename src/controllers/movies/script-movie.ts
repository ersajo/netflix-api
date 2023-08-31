import { StatusCodes } from "http-status-codes";

import { IControllerResponse } from "..";
import { IHttpRequest } from "../../helpers/callback";
import { ICreateMovies } from "../../services/movies/insert-movie";
import { IGetMovie } from "../../services/movies/get-movie";
import { IGetPlatform } from "../../services/platforms/get-platform";
import { ObjectId } from "mongodb";

export const buildScriptMovie = ({
  createMovie,
  getMovie,
  getPlatform,
} : {
  createMovie: ICreateMovies,
  getMovie: IGetMovie,
  getPlatform: IGetPlatform,
}) => {
  return async (request: Partial<IHttpRequest>): Promise<IControllerResponse> => {
    try {
      const { params, query } = request;
      if (!params?.id) throw new Error("You must supply an id.");
      if (query?.action !== 'clone') throw new Error("Action cannot be perform.");

      const movie = await getMovie({ _id: new ObjectId(params.id) });
      if (!movie) throw new Error("Movie not found.");

      delete movie._id;
      movie.title = `${movie.title} (copy)`;
      const insertedMovie = await createMovie(movie);

      insertedMovie.platforms = await Promise.all(
        insertedMovie.platforms.map(async (platform: any) => {
          const platformFound = await getPlatform({ _id: platform.platform_id});
          return platformFound;
        })
      );

      return {
        success: true,
        statusCode: StatusCodes.OK,
        body: {
          movie: insertedMovie,
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
import { StatusCodes } from "http-status-codes";
import { ICreateMovies } from "../../services/movies/insert-movie";

import { IControllerResponse } from "..";
import { IHttpRequest } from "../../helpers/callback";
import { IGetPlatform } from "../../services/platforms/get-platform";
import { ICreatePlatform } from "../../services/platforms/insert-platform";
import { IPlatform } from "../../models";
import { IGetMovie } from "../../services/movies/get-movie";

export const buildInsertMovie = ({
  createMovie,
  getMovie,
  getPlatform,
  createPlatform
}: {
  createMovie: ICreateMovies,
  getMovie: IGetMovie,
  getPlatform: IGetPlatform,
  createPlatform: ICreatePlatform,
}) => {
  return async (request: Partial<IHttpRequest>): Promise<IControllerResponse> => {
    try {
      const { body: movie } = request;
      const movieFound = await getMovie({title: movie.title});
      if (movieFound) throw new Error('Movie already exists');

      movie.platforms = await Promise.all(
        movie.platforms.map(async (platform: IPlatform) => {
          const platformFound = await getPlatform({ title: platform.title});
          if (platformFound) {
            return { platform_id: platformFound._id };
          }
          const { _id: newId } = await createPlatform(platform);
          return { platform_id: newId };
        })
      );

      const insertedMovie = await createMovie(movie);

      if (!insertedMovie.platforms) insertedMovie.platforms = [];
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
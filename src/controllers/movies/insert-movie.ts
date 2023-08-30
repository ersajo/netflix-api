import { StatusCodes } from "http-status-codes";
import { ICreateMovies } from "../../services/movies/insert-movie";

import { IControllerResponse } from "..";
import { IHttpRequest } from "../../helpers/callback";

export const buildInsertMovie = ({ createMovie }: { createMovie: ICreateMovies }) => {
  return async (request: Partial<IHttpRequest>): Promise<IControllerResponse> => {
    try {
      const { body: movie } = request;
      const insertedMovie = await createMovie(movie);

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
import { StatusCodes } from "http-status-codes";
import { IDeleteMovie } from "../../services/movies/delete-movie";

import { IControllerResponse } from "..";
import { IHttpRequest } from "../../helpers/callback";

export const buildDeleteMovie = ({ deleteMovie }: { deleteMovie: IDeleteMovie }) => {
  return async (request: Partial<IHttpRequest>): Promise<IControllerResponse> => {
    try {
      const { params } = request;
      if (!params?.id) {
        throw new Error("You must supply an id.");
      }
      const deletedMovie = await deleteMovie(params.id);

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
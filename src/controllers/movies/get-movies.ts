import { StatusCodes } from "http-status-codes";
import { IGetMovies } from "../../services/movies/get-movies";

import { IControllerResponse } from "..";

export const buildGetMovies = ({ getMovies }: { getMovies: IGetMovies }) => {
  return async (): Promise<IControllerResponse> => {
    try {
      const movies = await getMovies({}, null, {_id: -1});

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
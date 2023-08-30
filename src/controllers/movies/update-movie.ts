import { StatusCodes } from "http-status-codes";
import { IUpdateMovie } from "../../services/movies/update-movie";

import { IControllerResponse } from "..";
import { IHttpRequest } from "../../helpers/callback";

export const buildUpdateMovie = ({ updateMovie }: { updateMovie: IUpdateMovie }) => {
  return async (request: Partial<IHttpRequest>): Promise<IControllerResponse> => {
    try {
      const { params, body } = request;
      if (!params?.id) {
        throw new Error("You must supply an id.");
      }
      const updatedMovie = await updateMovie(params.id, body);

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
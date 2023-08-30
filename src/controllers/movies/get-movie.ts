import { StatusCodes } from "http-status-codes";
import { IGetMovie } from "../../services/movies/get-movie";

import { IControllerResponse } from "..";
import { IHttpRequest } from "../../helpers/callback";
import { ObjectId } from "mongodb";

export const buildGetMovie = ({ getMovie }: { getMovie: IGetMovie }) => {
  return async (request: Partial<IHttpRequest>): Promise<IControllerResponse> => {
    try {
      const { params } = request;
      if (!params?.id) {
        throw new Error("You must supply an id.");
      }
      const movie = await getMovie({_id: new ObjectId(params.id)});

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
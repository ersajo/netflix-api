import { StatusCodes } from "http-status-codes";
import { ICreateReview } from "../../services/reviews/insert-review";

import { IControllerResponse } from "..";
import { IHttpRequest } from "../../helpers/callback";
import { IGetMovie } from "../../services/movies/get-movie";
import { ObjectId } from "mongodb";
import { IGetPlatform } from "../../services/platforms/get-platform";

export const buildInsertReview = ({
  createReview,
  getMovie,
  getPlatform,
}: {
  createReview: ICreateReview,
  getMovie: IGetMovie,
  getPlatform: IGetPlatform,
}) => {
  return async (request: Partial<IHttpRequest>): Promise<IControllerResponse> => {
    try {
      const { body: review } = request;
      if (!review?.movie || !review?.platform) throw new Error("You must supply an id.");

      const movieFound = await getMovie({ _id: new ObjectId(review.movie)});
      if (!movieFound) throw new Error('Movie not found');

      const platformFound = await getPlatform({ _id: new ObjectId(review.platform)});
      if (!platformFound) throw new Error('Platform not found');

      const insertedReview = await createReview(review);

      insertedReview.movie = movieFound;
      insertedReview.platform = platformFound;

      delete insertedReview.movie.platforms;
      return {
        success: true,
        statusCode: StatusCodes.OK,
        body: {
          review: insertedReview,
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
  };
}
import { ObjectId } from "mongodb";
import { StatusCodes } from "http-status-codes";
import { IGetMovie } from "../../services/movies/get-movie";

import { IControllerResponse } from "..";
import { IHttpRequest } from "../../helpers/callback";
import { IGetPlatform } from "../../services/platforms/get-platform";
import { IGetReviews } from "../../services/reviews/get-reviews";
import { IGetScore } from "../../services/reviews/get-score";

export const buildGetMovie = ({
  getMovie,
  getPlatform,
  getReviews,
  getScore,
}: {
  getMovie: IGetMovie,
  getPlatform: IGetPlatform,
  getReviews: IGetReviews,
  getScore: IGetScore,
}) => {
  return async (request: Partial<IHttpRequest>): Promise<IControllerResponse> => {
    try {
      const { params } = request;
      if (!params?.id) throw new Error("You must supply an id.");

      const movie = await getMovie({_id: new ObjectId(params.id)});

      if (!movie.platforms) movie.platforms = [];
      movie.platforms = await Promise.all(
        movie.platforms.map(async (platform: any) => {
          const platformFound = await getPlatform({ _id: platform.platform_id});
          return platformFound;
        })
      );

      movie.reviews = await getReviews({ movie: movie._id?.toString() });
      movie.reviews = await Promise.all(movie.reviews.map(async (review: any) => {
        const platformFound = await getPlatform({ _id: new ObjectId(review._id) });
        review.platform = platformFound.title;
        return review;
      }));

      movie.score = await getScore({ movie: movie._id?.toString() });

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
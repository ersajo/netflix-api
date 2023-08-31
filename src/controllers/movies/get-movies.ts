import { StatusCodes } from "http-status-codes";
import { IGetMovies } from "../../services/movies/get-movies";

import { IControllerResponse } from "..";
import { IGetPlatform } from "../../services/platforms/get-platform";
import { IGetReviews } from "../../services/reviews/get-reviews";
import { IGetScore } from "../../services/reviews/get-score";
import { ObjectId } from "mongodb";

export const buildGetMovies = ({
  getMovies,
  getPlatform,
  getReviews,
  getScore,
}: {
  getMovies: IGetMovies,
  getPlatform: IGetPlatform,
  getReviews: IGetReviews,
  getScore: IGetScore,
}) => {
  return async (): Promise<IControllerResponse> => {
    try {
      const movies = await getMovies({}, null, {_id: -1});

      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        if (!movie.platforms) movie.platforms = [];
        movie.platforms = await Promise.all(
          movie.platforms.map(async (platform: any) => {
            const platformFound = await getPlatform({ _id: platform.platform_id});
            return platformFound;
          }
        ));
        movie.reviews = await getReviews({ movie: movie._id?.toString() });
        movie.reviews = await Promise.all(movie.reviews.map(async (review: any) => {
          const platformFound = await getPlatform({ _id: new ObjectId(review._id) });
          review.platform = platformFound.title;
          return review;
        }));
        movie.score = await getScore({ movie: movie._id?.toString() });
      }

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
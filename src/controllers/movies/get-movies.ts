import { StatusCodes } from "http-status-codes";
import { IGetMovies } from "../../services/movies/get-movies";

import { IControllerResponse } from "..";
import { IGetPlatform } from "../../services/platforms/get-platform";
import { IGetReviews } from "../../services/reviews/get-reviews";
import { IGetScore } from "../../services/reviews/get-score";
import { ObjectId } from "mongodb";
import { IHttpRequest } from "../../helpers/callback";
import { skip } from "node:test";
import { getTotalMovies } from "../../services/movies";

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
  return async (request: Partial<IHttpRequest>): Promise<IControllerResponse> => {
    try {
      const { query } = request;
      const page = parseInt(query?.page as string) ?? 1;
      const size = parseInt(query?.size as string) ?? 10;
      const sortBy = query?.sortBy as string ?? "_id";
      const sortOrder = query?.sortOrder as string === "asc" ? 1 : -1;
      const movies = await getMovies(
        {},
        { skip: (page - 1) * size, limit: size },
        { [sortBy]: sortOrder}
      );

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

      const total = await getTotalMovies({});

      return {
        success: true,
        statusCode: StatusCodes.OK,
        body: {
          movies,
          meta: {
            page,
            size,
            total,
          },
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
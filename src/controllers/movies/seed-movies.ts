import { StatusCodes } from "http-status-codes";
import { ICreateMovies } from "../../services/movies/insert-movie";

import { IControllerResponse } from "..";

import { movies } from "../../seeds/movies";
import { IGetPlatform } from "../../services/platforms/get-platform";
import { ICreatePlatform } from "../../services/platforms/insert-platform";
import { IPlatform } from "../../models";

export const buildSeedMovies = ({
  createMovie,
  getPlatform,
  createPlatform,
}: {
  createMovie: ICreateMovies,
  getPlatform: IGetPlatform,
  createPlatform: ICreatePlatform,
}) => {
  return async (): Promise<IControllerResponse> => {
    try {
      await Promise.all(movies.map(async (movie: any) => {
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

        await createMovie(movie);
      }));

      return {
        success: true,
        statusCode: StatusCodes.OK,
        body: {
          msg: 'Data seeded successfully',
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
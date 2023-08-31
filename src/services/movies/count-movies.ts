import { IMoviesDb } from "../../data/movies";
import { IMovie } from "../../models";

export type IGetTotalMovies = (
  filter: any,
) => Promise<number>;

export const buildGetTotalMovies = ({
  moviesDb
}: {
  moviesDb: IMoviesDb
}): IGetTotalMovies => {
  return async (filter: any): Promise<number> => {
    const totalMovies = await moviesDb.getTotalMovies(filter);

    return totalMovies;
  }
}
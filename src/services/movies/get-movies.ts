import { IMoviesDb } from "../../data/movies";
import { IMovie } from "../../models";

export type IGetMovies = (
  filter: any,
  pagination: any,
  sort: any
) => Promise<IMovie[]>;

export const buildGetMovies = ({
  moviesDb
}: {
  moviesDb: IMoviesDb
}): IGetMovies => {
  return async (filter: any, pagination: any, sort: any): Promise<IMovie[]> => {
    const movies = await moviesDb.getMovies(filter, pagination, sort);

    return movies;
  }
}
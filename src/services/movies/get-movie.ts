import { IMoviesDb } from "../../data/movies";
import { IMovie } from "../../models";

export type IGetMovie = (
  query: any,
) => Promise<IMovie>;

export const buildGetMovie = ({
  moviesDb
}: {
  moviesDb: IMoviesDb
}): IGetMovie => {
  return async (query: any): Promise<IMovie> => {
    const movie = await moviesDb.getMovie(query);

    return movie;
  }
}
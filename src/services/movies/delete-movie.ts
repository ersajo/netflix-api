import { IMoviesDb } from "../../data/movies";
import { IMovie } from "../../models";

export type IDeleteMovie = (
  id: string
) => Promise<IMovie>;

export const buildDeleteMovie = ({
  moviesDb
}: {
  moviesDb: IMoviesDb
}): IDeleteMovie => {
  return async (id: string): Promise<IMovie> => {
    const deletedMovie = await moviesDb.deleteMovie(id);

    return deletedMovie;
  }
}
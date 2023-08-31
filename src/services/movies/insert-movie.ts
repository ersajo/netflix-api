import { IMoviesDb } from "../../data/movies";
import { IMovie } from "../../models";

export type ICreateMovies = (
  movie: IMovie
) => Promise<IMovie>;

export const buildCreateMovies = ({
  moviesDb
}: {
  moviesDb: IMoviesDb
}): ICreateMovies => {
  return async (movie: IMovie): Promise<IMovie> => {
    movie.createdAt = new Date().toISOString();
    movie.updatedAt = movie.createdAt;
    movie.slug = movie.title.toLowerCase().replace(/ /g, '-');
    movie.slug = movie.slug.replace(/[^\w-]+/g, '');
    const insertedMovie = await moviesDb.insertMovie(movie);

    return insertedMovie;
  }
}
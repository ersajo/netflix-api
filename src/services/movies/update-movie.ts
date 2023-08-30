import { IMoviesDb } from "../../data/movies";
import { IMovie } from "../../models";

export type IUpdateMovie = (
  id: string,
  movie: IMovie
) => Promise<IMovie>;

export const buildUpdateMovie = ({
  moviesDb
}: {
  moviesDb: IMoviesDb
}): IUpdateMovie => {
  return async (id: string, movie: IMovie): Promise<IMovie> => {
    movie.updatedAt = new Date().toLocaleString('es-ES', {
      timeZone: 'America/Mexico_City',
    });
    if (movie.title) {
      movie.slug = movie.title.toLowerCase().replace(/ /g, '-');
      movie.slug = movie.slug.replace(/[^\w-]+/g, '');
    }
    const updatedMovie = await moviesDb.updateMovie(id, movie);

    return updatedMovie;
  }
}
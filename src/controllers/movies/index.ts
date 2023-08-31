import {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../../services/movies";

import {
  getPlatform,
  createPlatform
} from "../../services/platforms";

import { buildGetMovies } from "./get-movies";
import { buildGetMovie } from "./get-movie";
import { buildInsertMovie } from "./insert-movie";
import { buildUpdateMovie } from "./update-movie";
import { buildDeleteMovie } from "./delete-movie";

export const getMoviesController = buildGetMovies({ getMovies });
export const getMovieController = buildGetMovie({ getMovie });
export const createMovieController = buildInsertMovie({
  createMovie,
  getMovie,
  getPlatform,
  createPlatform
});
export const updateMovieController = buildUpdateMovie({ updateMovie });
export const deleteMovieController = buildDeleteMovie({ deleteMovie });
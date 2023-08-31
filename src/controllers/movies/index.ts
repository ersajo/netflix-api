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

import {
  getReviews,
  getScore,
} from "../../services/reviews";

import { buildGetMovies } from "./get-movies";
import { buildGetMovie } from "./get-movie";
import { buildInsertMovie } from "./insert-movie";
import { buildUpdateMovie } from "./update-movie";
import { buildDeleteMovie } from "./delete-movie";
import { buildScriptMovie } from "./script-movie";

export const getMoviesController = buildGetMovies({
  getMovies,
  getPlatform,
  getReviews,
  getScore,
});
export const getMovieController = buildGetMovie({
  getMovie,
  getPlatform,
  getReviews,
  getScore,
});
export const createMovieController = buildInsertMovie({
  createMovie,
  getMovie,
  getPlatform,
  createPlatform
});
export const updateMovieController = buildUpdateMovie({
  updateMovie,
  getPlatform,
  getMovie,
  createPlatform,
});
export const deleteMovieController = buildDeleteMovie({
  deleteMovie,
  getPlatform,
});
export const scriptMovieController = buildScriptMovie({
  createMovie,
  getMovie,
  getPlatform,
});
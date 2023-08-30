import { getMovies } from "../../services/movies";
import { getMovie } from "../../services/movies";
import { createMovie } from "../../services/movies";
import { updateMovie } from "../../services/movies";
import { deleteMovie } from "../../services/movies";

import { buildGetMovies } from "./get-movies";
import { buildGetMovie } from "./get-movie";
import { buildInsertMovie } from "./insert-movie";
import { buildUpdateMovie } from "./update-movie";
import { buildDeleteMovie } from "./delete-movie";

export const getMoviesController = buildGetMovies({ getMovies });
export const getMovieController = buildGetMovie({ getMovie });
export const createMovieController = buildInsertMovie({ createMovie });
export const updateMovieController = buildUpdateMovie({ updateMovie });
export const deleteMovieController = buildDeleteMovie({ deleteMovie });
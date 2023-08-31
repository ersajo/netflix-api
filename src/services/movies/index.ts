import { moviesDb } from "../../data";

import { buildGetMovies } from "./get-movies";
import { buildGetMovie } from "./get-movie";
import { buildCreateMovies } from "./insert-movie";
import { buildUpdateMovie } from "./update-movie";
import { buildDeleteMovie } from "./delete-movie";
import { buildGetTotalMovies } from "./count-movies";

export const getMovies = buildGetMovies({ moviesDb });
export const getMovie = buildGetMovie({ moviesDb });
export const createMovie = buildCreateMovies({ moviesDb });
export const updateMovie = buildUpdateMovie({ moviesDb });
export const deleteMovie = buildDeleteMovie({ moviesDb });
export const getTotalMovies = buildGetTotalMovies({ moviesDb });
import { db } from '../db';

import { buildMoviesDb } from './movies';

export const moviesDb = buildMoviesDb({ db });
import { db } from '../db';

import { buildMoviesDb } from './movies';
import { buildPlatformsDb } from './platforms';

export const platformsDb = buildPlatformsDb({ db });
export const moviesDb = buildMoviesDb({ db });
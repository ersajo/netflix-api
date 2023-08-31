import { db } from '../db';

import { buildMoviesDb } from './movies';
import { buildPlatformsDb } from './platforms';
import { buildReviewsDb } from './reviews';

export const platformsDb = buildPlatformsDb({ db });
export const moviesDb = buildMoviesDb({ db });
export const reviewsDb = buildReviewsDb({ db });
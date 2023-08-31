import {
  createReview,
} from '../../services/reviews';

import {
  getMovie,
} from '../../services/movies';

import {
  getPlatform,
} from '../../services/platforms';

import { buildInsertReview } from './insert-review';

export const createReviewController = buildInsertReview({
  createReview,
  getMovie,
  getPlatform,
});
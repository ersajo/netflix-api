import { reviewsDb } from "../../data";

import { buildGetReviews } from "./get-reviews";
import { buildGetReview } from "./get-review";
import { buildCreateReviews } from "./insert-review";
import { buildGetScore } from "./get-score";

export const getReviews = buildGetReviews({ reviewsDb });
export const getReview = buildGetReview({ reviewsDb });
export const createReview = buildCreateReviews({ reviewsDb });
export const getScore = buildGetScore({ reviewsDb });
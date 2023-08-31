import { reviewsDb } from "../../data";

import { buildGetReview } from "./get-review";
import { buildCreateReviews } from "./insert-review";

export const getReview = buildGetReview({ reviewsDb });
export const createReview = buildCreateReviews({ reviewsDb });
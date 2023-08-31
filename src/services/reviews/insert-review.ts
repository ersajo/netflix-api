import { IReviewsDb } from "../../data/reviews";
import { IReview } from "../../models";

export type ICreateReview = (
  review: IReview,
) => Promise<IReview>;

export const buildCreateReviews = ({
  reviewsDb
}: {
  reviewsDb: IReviewsDb
}): ICreateReview => {
  return async (review: IReview): Promise<IReview> => {
    review.createdAt = new Date().toISOString();
    review.updatedAt = review.createdAt;
    const reviews = await reviewsDb.insertReview(review);

    return reviews;
  }
}
import { IReviewsDb } from "../../data/reviews";
import { IReview } from "../../models";

export type IGetReviews = (
  filter: any,
) => Promise<IReview[]>;

export const buildGetReviews = ({
  reviewsDb
}: {
  reviewsDb: IReviewsDb
}): IGetReviews => {
  return async (filter: any): Promise<IReview[]> => {
    const reviews = await reviewsDb.getReviews(filter);

    return reviews;
  }
}
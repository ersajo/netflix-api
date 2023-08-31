import { IReviewsDb } from "../../data/reviews";
import { IReview } from "../../models";

export type IGetReview = (
  query: any,
) => Promise<IReview>;

export const buildGetReview = ({
  reviewsDb
}: {
  reviewsDb: IReviewsDb
}): IGetReview => {
  return async (query: any): Promise<IReview> => {
    const reviews = await reviewsDb.getReview(query);

    return reviews;
  }
}

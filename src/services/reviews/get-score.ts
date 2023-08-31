import { IReviewsDb } from "../../data/reviews";
import { IReview } from "../../models";

export type IGetScore = (
  filter: any,
) => Promise<number>;

export const buildGetScore = ({
  reviewsDb
}: {
  reviewsDb: IReviewsDb
}): IGetScore => {
  return async (filter: any): Promise<number> => {
    const reviews = await reviewsDb.getScore(filter);

    return reviews;
  }
}
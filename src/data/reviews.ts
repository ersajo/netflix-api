import { IReview } from "../models";

export interface IReviewsDb {
  getReview: (query: any) => Promise<IReview>;
  insertReview: (review: IReview) => Promise<IReview>;
}

const COLLECTION = 'reviews';

export const buildReviewsDb = ({
  db,
}: {
  db: any;
}): IReviewsDb => {
  const getReview = async (
    query: any,
  ): Promise<IReview> => {
    const { client } = db;
    const review = await client
      .db()
      .collection(COLLECTION)
      .findOne(query);
    return review;
  }

  const insertReview = async (
    review: IReview,
  ): Promise<IReview> => {
    const { client } = db;
    const { insertedId } = await client
      .db()
      .collection(COLLECTION)
      .insertOne(review);
    const insertedReview = await getReview({ _id: insertedId });
    return insertedReview;
  }

  return {
    getReview,
    insertReview,
  }
}
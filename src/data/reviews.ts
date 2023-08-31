import { IReview } from "../models";

export interface IReviewsDb {
  getReviews: (filter: any) => Promise<any>;
  getReview: (query: any) => Promise<IReview>;
  insertReview: (review: IReview) => Promise<IReview>;
  getScore: (filter: any) => Promise<number>;
}

const COLLECTION = 'reviews';

export const buildReviewsDb = ({
  db,
}: {
  db: any;
}): IReviewsDb => {
  const getReviews = async (
    filter: any,
  ): Promise<any> => {
    const { client } = db;
    const cursor = await client
      .db()
      .collection(COLLECTION)
      .aggregate([
        {
          $match: filter,
        },
        {
          $group: {
            _id: '$platform',
            data: { $push: '$$ROOT'},
            score: {
              $avg: "$score"
            }
          }
        },
      ]);
    const reviews = await cursor.toArray();
    return reviews;
  }

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

  const getScore = async (
    filter: any,
  ): Promise<any> => {
    const { client } = db;
    const cursor = await client
      .db()
      .collection(COLLECTION)
      .aggregate([
        {
          $match: filter,
        },
        {
          $group: {
            _id: '$movie',
            score: {
              $avg: "$score"
            }
          }
        },
      ]);
    const [data] = await cursor.toArray();
    return data?.score ?? 0;
  }

  return {
    getReviews,
    getReview,
    insertReview,
    getScore,
  }
}
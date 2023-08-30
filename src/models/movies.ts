import { UUID } from "mongodb";
import { IPlatform, IReview } from "./";

export interface IMovie {
  _id: UUID;
  title: string;
  slug: string;
  image: string;
  director: string;
  platforms: IPlatform[];
  score: number;
  createdAt: string;
  updatedAt: string;
  reviews: IReview[];
}
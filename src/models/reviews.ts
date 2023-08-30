import { UUID } from "mongodb";
import { IMovie, IPlatform } from ".";

export interface IReview {
  _id: UUID;
  movie: IMovie;
  platform: IPlatform;
  author: string;
  body: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}
import { UUID } from "mongodb";

export interface IPlatform {
  _id: UUID;
  icon: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
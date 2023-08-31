import { ObjectId } from "mongodb";
import { IMovie } from "../models";

export interface IMoviesDb {
  getMovies: (filter: any, pagination: any, sort: any) => Promise<IMovie[]>;
  getMovie: (query: any) => Promise<IMovie>;
  insertMovie: (movie: IMovie) => Promise<IMovie>;
  updateMovie: (id: string, movie: IMovie) => Promise<IMovie>;
  deleteMovie: (id: string) => Promise<IMovie>;
  getTotalMovies: (filter: any) => Promise<number>;
}

const COLLECTION = 'movies';

export const buildMoviesDb = ({
  db,
}: {
  db: any;
}): IMoviesDb => {
  const getMovies = async (
    filter: any,
    pagination: any,
    sort: any,
  ): Promise<IMovie[]> => {
    const { client } = db;
    const $pagination = pagination ?? { skip: 0, limit: 0 };
    const $sort = sort ?? { _id: -1 };
    const cursor = await client
      .db()
      .collection(COLLECTION)
      .find(filter)
      .sort($sort)
      .skip($pagination.skip)
      .limit($pagination.limit);
    const movies = await cursor.toArray();
    return movies;
  }

  const getMovie = async (
    query: any,
  ): Promise<IMovie> => {
    const { client } = db;
    const movie = await client
      .db()
      .collection(COLLECTION)
      .findOne(query);
    return movie;
  }

  const insertMovie = async (
    movie: IMovie,
  ): Promise<IMovie> => {
    const { client } = db;
    const { insertedId } = await client
      .db()
      .collection(COLLECTION)
      .insertOne(movie);
    const insertedMovie = await getMovie({ _id: new ObjectId(insertedId) });
    return insertedMovie;
  }

  const updateMovie = async (
    id: string,
    movie: IMovie,
  ): Promise<IMovie> => {
    const { client } = db;
    await client
      .db()
      .collection(COLLECTION)
      .updateOne({ _id: new ObjectId(id) }, { $set: movie });
    const updatedMovie = await getMovie({ _id: new ObjectId(id) });
    return updatedMovie;
  }

  const deleteMovie = async (
    id: string,
  ): Promise<IMovie> => {
    const { client } = db;
    const deletedMovie = await getMovie({ _id: new ObjectId(id) });
    await client
      .db()
      .collection(COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });
    return deletedMovie;
  }

  const getTotalMovies = async (
    filter: any,
  ): Promise<number> => {
    const { client } = db;
    const total = await client
      .db()
      .collection(COLLECTION)
      .countDocuments(filter);

    return total;
  }

  return {
    getMovies,
    getMovie,
    insertMovie,
    updateMovie,
    deleteMovie,
    getTotalMovies,
  }
}
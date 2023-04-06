import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IMovie, TMovie } from "./interface";
import { client } from "./database";
import format from "pg-format";

const listMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  let queryString: string = ``;
  let queryResult: QueryResult<TMovie>;

  queryString = `
    SELECT
    *
    FROM
    movies;
    `;
  queryResult = await client.query(queryString);

  return response.json(queryResult.rows);
};

const createMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieData: TMovie = request.body;

  const queryString: string = `
    INSERT INTO movies
    ("name", "category", "duration", "price")
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: Object.values(movieData),
  };

  console.log(queryConfig);

  const queryResult: QueryResult<TMovie> = await client.query(queryConfig);

  return response.status(201).json(queryResult.rows[0]);
};

const getSpecificMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movie: IMovie = response.locals.movie;

  return response.status(200).json(movie);
};

const updateMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { body, params } = request;

  const upDatedColumns: Array<string> = Object.keys(body);
  const upDatedValues: Array<string> = Object.values(body);

  const queryString: string = `
    UPDATE "movies"
    SET 
    (%I) = ROW (%L)
    WHERE id = $1
    RETURNING *;
  `;
  const queryFormat = format(queryString, upDatedColumns, upDatedValues);
  const queryConfig = {
    text: queryFormat,
    values: [params.id],
  };
  const queryResult: QueryResult = await client.query(queryConfig);
  const updatedMovie = queryResult.rows[0];

  return response.status(200).json(updatedMovie);
};

const deleteMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { params } = request;

  const queryString: string = `
  DELETE FROM 
  movies 
  WHERE 
  id = $1;
 `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [params.id],
  };
  const queryResult: QueryResult = await client.query(queryConfig);

  return response.status(204).send();
};

export { listMovies, createMovie, getSpecificMovie, updateMovie, deleteMovie };

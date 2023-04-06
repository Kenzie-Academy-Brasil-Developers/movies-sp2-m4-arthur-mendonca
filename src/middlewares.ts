import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IMovie, TMovie } from "./interface";
import { client } from "./database";

const checkMovieById = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(request.params.id);

  const queryString: string = `
    SELECT 
    * 
    FROM 
    movies 
    WHERE 
    id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  console.log(queryConfig);
  const queryResult: QueryResult<IMovie> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    return response.status(404).json({
      error: "Movie not found!",
    });
  }
  console.log(queryResult);
  response.locals.movie = queryResult.rows[0];
  return next();
};

const checkMovieName = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const movieData: TMovie = request.body;

  const queryString: string = `
  SELECT * 
  FROM movies
  WHERE 
  name = $1;
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [movieData.name],
  };
  const queryResult: QueryResult = await client.query(queryConfig);
  const duplicatedName = queryResult.rows[0];
  if (duplicatedName) {
    return response.status(409).json({
      error: `Movie with name ${movieData.name} already exists.`,
    });
  }

  return next();
};

const sortByCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieCategory = request.query.category;
  let queryString: string = ``;

  if (movieCategory) {
    queryString = `
    SELECT
    *
    FROM
    movies
    WHERE
    category = $1;
    `;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [movieCategory],
    };
    const queryResult: QueryResult = await client.query(queryConfig);

    if (queryResult.rows.length > 0) {
      return response.status(200).json(queryResult.rows);
    }
  }

  return next();
};

export { checkMovieById, checkMovieName, sortByCategory };

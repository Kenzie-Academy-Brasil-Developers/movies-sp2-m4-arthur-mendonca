import express, { json, Application } from "express";
import { startDatabase } from "./database";
import {
  createMovie,
  deleteMovie,
  getSpecificMovie,
  listMovies,
  updateMovie,
} from "./logic";
import { checkMovieById, checkMovieName, sortByCategory } from "./middlewares";

const app: Application = express();

app.use(json());

app.post("/movies", checkMovieName, createMovie);
app.get("/movies", sortByCategory, listMovies);
app.get("/movies/:id", checkMovieById, getSpecificMovie);
app.patch("/movies/:id", checkMovieById, checkMovieName, updateMovie);
app.delete("/movies/:id", checkMovieById, deleteMovie);

const PORT = 3000;
const runningMsg = `Server is running on port${PORT}.`;

app.listen(PORT, async () => {
  await startDatabase();
  console.log(runningMsg);
});

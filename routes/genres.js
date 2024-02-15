import { Router } from "express";
import { books, movies } from "../controllers/genres.js";

const routes = Router();

routes.get("/books", books);
routes.get("/movies", movies);

export default routes;
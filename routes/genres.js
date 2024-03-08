import { Router } from "express";
import { albums, books, movies } from "../controllers/genres.js";

const routes = Router();

routes.get("/books", books);
routes.get("/movies", movies);
routes.get("/albums", albums);

export default routes;
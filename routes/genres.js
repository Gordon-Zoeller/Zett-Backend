import { Router } from "express";
import { books } from "../controllers/genres.js";

const routes = Router();

routes.get("/books", books);

export default routes;
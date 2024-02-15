import { Router } from "express";
import { createMovie, genre, image } from "../controllers/movies.js";
import { authorization } from "../middleware/authorization.js";
import { role } from "../middleware/role.js";

const routes = Router();

routes.post("/upload", authorization, role, createMovie);
routes.get("/genre/:genre", genre);
routes.get("/image/:fileName", image);

export default routes;
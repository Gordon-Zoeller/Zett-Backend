import { Router } from "express";
import { createMovie } from "../controllers/movies.js";
import { authorization } from "../middleware/authorization.js";
import { role } from "../middleware/role.js";

const routes = Router();

routes.post("/upload", authorization, role, createMovie);

export default routes;
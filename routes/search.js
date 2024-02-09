import { Router } from "express";
import { search } from "../controllers/search.js";

const routes = Router();

routes.get("/:query/:category", search);

export default routes;
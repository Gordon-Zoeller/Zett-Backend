import { Router } from "express";
import { createBook, genre, image } from "../controllers/books.js";
import { authorization } from "../middleware/authorization.js";
import { role } from "../middleware/role.js";

const routes = Router();

routes.post("/upload", authorization, role, createBook);
routes.get("/genre/:genre", genre);
routes.get("/image/:fileName", image);

export default routes;
import { Router } from "express";
import { createAlbum, genre } from "../controllers/albums.js";
import { authorization } from "../middleware/authorization.js";
import { role } from "../middleware/role.js";

const routes = Router();

routes.post("/upload", authorization, role, createAlbum);
routes.get("/genre/:genre", genre);

export default routes;
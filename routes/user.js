import { Router } from "express";
import { register } from "../controllers/user.js";
import { validation } from "../middleware/validation.js";

const routes = Router();

routes.post("/register", validation, register);

export default routes;
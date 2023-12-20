import { Router } from "express";
import { authorizeUser, register } from "../controllers/user.js";
import { validation } from "../middleware/validation.js";
import { authorization } from "../middleware/authorization.js";

const routes = Router();

routes.post("/register", validation, register);

routes.get("/verifytoken", authorization, authorizeUser);

export default routes;
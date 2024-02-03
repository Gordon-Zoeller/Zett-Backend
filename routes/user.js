import { Router } from "express";
import { authorizedUser, signin, register } from "../controllers/user.js";
import { validation } from "../middleware/validation.js";
import { authorization } from "../middleware/authorization.js";

const routes = Router();

routes.post("/register", validation, register);
routes.post("/signin", signin);

routes.get("/verifytoken", authorization, authorizedUser);

export default routes;
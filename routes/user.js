import { Router } from "express";
import { authorizedUser, signin, signup } from "../controllers/user.js";
import { validation } from "../middleware/validation.js";
import { authorization } from "../middleware/authorization.js";

const routes = Router();

routes.post("/signup", validation, signup);
routes.post("/signin", signin);

routes.get("/verify", authorization, authorizedUser);

export default routes;
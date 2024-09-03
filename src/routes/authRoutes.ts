import { Router } from "express";

import validateRequestBody from "../middlewares/request-body-validation.middleware";
import { loginSchema } from "../validations/auth.validation";
import { login } from "../controllers/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/login", validateRequestBody(loginSchema), login);

export default authRoutes;

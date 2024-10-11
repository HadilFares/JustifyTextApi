import { Router } from "express";

import { generateToken } from "../controllers/token-controller";
import { validateToken } from "../middlewares/auth-middleware";
import { justify } from "../controllers";

export const tokenRouter = Router();

tokenRouter.post("/token", generateToken);
//tokenRouter.post("/verify", validateToken);

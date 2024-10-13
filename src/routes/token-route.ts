import { Router } from "express";

import { generateToken } from "../controllers";
export const tokenRouter = Router();

tokenRouter.post("/token", generateToken);

import { justifyTextHandler } from "./../controllers/apijustify-controller";
import { Router } from "express";

import { validateToken } from "../middlewares/auth-middleware";

export const justifyRouter = Router();

justifyRouter.post("/justify", validateToken, justifyTextHandler);

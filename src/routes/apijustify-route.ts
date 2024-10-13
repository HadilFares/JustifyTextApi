import { justifyTextHandler } from "./../controllers/apijustify-controller";
import { Router } from "express";
import { validateToken, rateLimitByEmail } from "../middlewares";

export const justifyRouter = Router();

justifyRouter.post(
  "/justify",
  validateToken as any,
  rateLimitByEmail as any,
  justifyTextHandler
);

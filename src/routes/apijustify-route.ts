import { justifyTextHandler } from "./../controllers/apijustify-controller";
import { Router } from "express";
import { rateLimitByEmail } from "./../middlewares/ratelimit-middleware";
import { validateToken } from "../middlewares/auth-middleware";

export const justifyRouter = Router();

justifyRouter.post(
  "/justify",
  validateToken as any,
  rateLimitByEmail as any,
  justifyTextHandler
);

import { justifyTextHandler } from "./../controllers/apijustify-controller";
import { Router } from "express";
import { validateToken, rateLimitByEmail } from "../middlewares";

export const justifyRouter = Router();

/**
 * @swagger
 * /justify:
 *   post:
 *     summary: Justify the given text with the specified size
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         required: true
 *         description: The number of characters per line for text justification
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia"
 *     responses:
 *       200:
 *         description: Text justified successfully.
 *       400:
 *         description: Invalid request or missing parameters.
 *       401:
 *         description: Unauthorized (missing or invalid token).
 */
justifyRouter.post(
  "/justify",
  validateToken as any,
  rateLimitByEmail as any,
  justifyTextHandler
);

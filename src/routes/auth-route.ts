import { Router } from "express";

import { generateToken } from "../controllers";
export const tokenRouter = Router();

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Generate a new token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: A new token has been generated
 *       400:
 *         description: Invalid request body
 */

tokenRouter.post("/token", generateToken);

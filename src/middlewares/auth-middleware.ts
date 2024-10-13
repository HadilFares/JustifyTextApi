import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ITokenRequest } from "../token-request-type";
import User from "../models/User";

export const validateToken = (
  req: ITokenRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const secretKey = process.env.SECRET_KEY;
  if (authHeader) {
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : "";
    jwt.verify(token, secretKey, async (err, payload) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid token",
        });
      } else {
        req.user = payload as { email: string };
        /* return res.status(200).json({
          success: true,
          message: "token",
          payload: payload,
        });*/
        return next();
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Token is not provided",
    });
  }
};

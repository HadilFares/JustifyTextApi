import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ITokenRequest } from "../type";

export const validateToken = (
  req: ITokenRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const secretKey = process.env.SECRET_KEY;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>

    jwt.verify(token, secretKey, (err, payload) => {
      //console.log(payload);
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid token",
        });
      } else {
        console.log("payload", payload); // Log the payload to check its structure
        //req.body.email = payload; // Assuming payload contains 'email'
        req.user = payload as string;
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

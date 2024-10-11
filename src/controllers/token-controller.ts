import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import "dotenv/config";
export const generateToken = (req: Request, res: Response) => {
  const email = req.body.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!req.body || !email || !email.match(emailRegex)) {
    res.status(400).json({ error: "Malformed request!" });
  }
  const secretKey = process.env.SECRET_KEY;
  const options = {
    expiresIn: "1d", //Token expiration time
  };

  const token = jwt.sign({ email }, secretKey, options);

  res.status(200).json({ token });
};

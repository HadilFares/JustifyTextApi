import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import "dotenv/config";
import User from "../models/User";
export const generateToken = async (req: Request, res: Response) => {
  const email = req.body?.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!req.body || !email || !email.match(emailRegex)) {
    res.status(400).json({ error: "Malformed request!" });
  }

  const secretKey = process.env.SECRET_KEY;
  const options = {
    expiresIn: "1d",
  };
  let user = await User.findOne({ email });
  if (!user) {
    // 2. If user doesn't exist , create a new user and generate a token , else generate a token
    user = new User({
      email,
      wordAccount: 80000,
      lastJustifyDate: null,
    });
    await user.save();
  }
  const token = jwt.sign({ email }, secretKey, options);
  res.status(200).json({ token });
};

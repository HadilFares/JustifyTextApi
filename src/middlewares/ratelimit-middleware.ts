import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { ITokenRequest } from "../type";

const WORDS_PER_DAY_LIMIT = 50;

export const rateLimitByEmail = async (
  req: ITokenRequest,
  res: Response,
  next: NextFunction
) => {
  const today = new Date().toISOString().split("T")[0]; // Get current date (YYYY-MM-DD)
  console.log("today", today);
  const { email } = req.user;

  try {
    // Find the user by email
    let user = await User.findOne({ email });
    console.log("userEmail", email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Count the number of words in the request body
    const words = req.body.split(" ").filter(Boolean).length;
    console.log("words", words);
    if (words > WORDS_PER_DAY_LIMIT) {
      return res.status(402).json({
        error: "Payment Required",
        message: "Word limit exceeded for the day. Please upgrade your plan.",
      });
    }

    console.log("convertlastJustifyDate", user.lastJustifyDate);
    if (!user.lastJustifyDate || user.lastJustifyDate !== today) {
      // Update the user's word count
      user.wordAccount = WORDS_PER_DAY_LIMIT - words;
      user.lastJustifyDate = new Date().toISOString().split("T")[0];
      //await user.save();
    } else {
      const RemainingWords = user.wordAccount - words;

      if (RemainingWords < 0) {
        return res.status(402).json({
          error: "Payment Required",
          message: "Word limit exceeded for the day. Please upgrade your plan.",
        });
      }
      user.wordAccount = RemainingWords;
      user.lastJustifyDate = new Date().toISOString().split("T")[0];
    }

    // Proceed to the next middleware
    await user.save();
    next();
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

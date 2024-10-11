require("dotenv").config();
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Access the MongoDB URI from the environment variables
const mongoUri = process.env.DB_STRING;

console.log(mongoUri);

const connectToDatabase = async () => {
  try {
    if (!mongoUri) {
      throw new Error("DATABASE_URI is not defined in environment variables");
    }
    mongoose.connect(mongoUri);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the db", error);
  }
};

export default connectToDatabase;

import mongoose from "mongoose";

// User interface extending Mongoose Document

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  wordAccount: {
    type: Number,
    default: 50,
  },
  lastJustifyDate: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;

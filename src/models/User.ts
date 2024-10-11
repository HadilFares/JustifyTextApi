import { Schema, model } from "mongoose";

// Raw document interface. Contains the data type as it will be stored
// in MongoDB. So you can ObjectId, Buffer, and other custom primitive data types.
// But no Mongoose document arrays or subdocuments.
interface IUser {
  email: string;
  wordcount: number;
  accesdate: Date;
}

// Schema
const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  wordcount: Number || 0,
  accesdate: Date,
});
export const User = model<IUser>("Movies", userSchema);

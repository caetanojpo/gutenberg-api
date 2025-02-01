import mongoose, { Schema } from "mongoose";
import { IUser } from "../../../domain/models/User";

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    hashedPassword: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);

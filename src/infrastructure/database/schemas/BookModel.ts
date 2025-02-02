import mongoose, { Schema } from "mongoose";
import { IBook } from "../../../domain/models/Book";

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    coverPictureUrl: { type: String, required: true },
    content: { type: String, required: true, default: "" },
    metadata: { type: String, required: true, default: "" },
  },
  { timestamps: true }
);

export const BookModel = mongoose.model<IBook>("Book", BookSchema);

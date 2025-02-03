import mongoose, { Schema } from "mongoose";
import { IBook } from "../../../domain/models/Book";
import { IMetadata } from "./../../../domain/models/Book";

const MetadataSchema = new Schema<IMetadata>(
  {
    published: { type: String, default: "" },
    downloads: { type: Number, default: 0 },
    language: { type: String, default: "" },
    category: { type: String, default: "" },
    rights: { type: String, default: "" },
  },
  { _id: false }
);

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    coverPictureUrl: { type: String, required: true },
    content: { type: String, required: false, default: "" },
    metadata: { type: MetadataSchema, required: true, default: {} },
  },
  { timestamps: true }
);

export const BookModel = mongoose.model<IBook>("Book", BookSchema);

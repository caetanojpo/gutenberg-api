import mongoose from "mongoose";
import { appConfig } from "../config";

export const connectDB = async () => {
  try {
    await mongoose.connect(appConfig.dbUri);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit on failure
  }
};

export const gracefulShutdownDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
};

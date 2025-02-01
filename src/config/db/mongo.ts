import mongoose from "mongoose";
import { env } from "../env";
import logger from "../logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.dbUri);
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection failed:", error);
    process.exit(1);
  }
};

export const gracefulShutdownDB = async () => {
  try {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed.");
  } catch (error) {
    logger.error("Error closing MongoDB connection:", error);
  }
};

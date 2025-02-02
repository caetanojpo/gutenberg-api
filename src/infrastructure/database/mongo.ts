import mongoose from "mongoose";
import { env } from "../env";
import { logger } from "../logger";
import { LoggerMessages } from "../../utils/helpers/LoggerMessages";

export const connectDB = async () => {
  try {
    logger.logFormatted("info", LoggerMessages.DB_CONNECTING);
    await mongoose.connect(env.dbUri);
    logger.logFormatted("info", LoggerMessages.DB_CONNECTED);
  } catch (error) {
    logger.logFormatted("error", LoggerMessages.DB_CONNECTION_ERROR);
    process.exit(1);
  }
};

export const gracefulShutdownDB = async () => {
  try {
    logger.logFormatted("info", LoggerMessages.DB_DISCONNECTING);
    await mongoose.connection.close();
    logger.logFormatted("info", LoggerMessages.DB_DISCONNECTED);
  } catch (error) {
    logger.logFormatted("info", LoggerMessages.DB_DISCONNECTED_ERROR, error);
  }
};

import app from "./index";
import { gracefulShutdownDB } from "./infrastructure/database/mongo";
import { env } from "./infrastructure/env";

import { LoggerMessages } from "./utils/helpers/LoggerMessages";
import { logger } from "./infrastructure/logger";

const server = app.listen(env.port, () =>
  logger.logFormatted("info", LoggerMessages.SERVER_LISTENING, env.port)
);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Gutenberg API!");
});

const gracefulShutdown = async () => {
  logger.logFormatted("info", LoggerMessages.GRACEFUL_SHUTDOWN);

  await gracefulShutdownDB();

  server.close(() => {
    logger.logFormatted("info", LoggerMessages.SERVER_STOPPED);
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

process.on("unhandledRejection", (reason, promise) => {
  logger.logFormatted(
    "error",
    LoggerMessages.UNHANDLED_REJECTION,
    promise,
    reason
  );
});

process.on("uncaughtException", (error) => {
  logger.logFormatted(
    "error",
    LoggerMessages.UNCAUGHT_EXCEPTION,
    error.message,
    error
  );
  process.exit(1);
});

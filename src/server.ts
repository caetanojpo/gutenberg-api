import app from "./index";
import { gracefulShutdownDB } from "./config/db/mongo";
import { appConfig } from "./config/config";
import logger from "./logger";

const server = app.listen(appConfig.port, () =>
  logger.info(`Listening on port ${appConfig.port}`)
);

const gracefulShutdown = async () => {
  logger.info("Graceful Shutdown initiated...");

  await gracefulShutdownDB();

  server.close(() => {
    logger.info("Server stopped gracefully.");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`, error);
  process.exit(1);
});

import app from "./index";
import { gracefulShutdownDB } from "./config/db/mongo";
import { env } from "./config/env";
import logger from "./config/logger";

const server = app.listen(env.port, () =>
  logger.info(`Listening on port ${env.port}`)
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

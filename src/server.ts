import app from "./index";
import { gracefulShutdownDB } from "./config/db/mongo";
import { appConfig } from "./config/config";

const server = app.listen(appConfig.port, () =>
  console.log(`Listening on port ${appConfig.port}`)
);

const gracefulShutdown = async () => {
  console.log("Graceful Shutdown initiated...");

  await gracefulShutdownDB();

  server.close(() => {
    console.log("Server stopped gracefully.");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

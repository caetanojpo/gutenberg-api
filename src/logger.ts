import winston from "winston";
import { appConfig } from "./config/config";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.printf((info) => {
    const { timestamp, level, message, stack } = info;

    if (stack) {
      const stackLines = (stack as string).split("\n");
      const origin = stackLines[1].trim();
      return `[${timestamp}] ${level.toUpperCase()}: ${message}\n  ↳ ${origin}`;
    }
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);

const logger = winston.createLogger({
  level: appConfig.nodeEnv === "dev" ? "debug" : "info",
  levels,
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        logFormat
      ),
    }),

    new winston.transports.File({
      filename: "logs/app.log",
      format: logFormat,
    }),

    new winston.transports.File({
      level: "error",
      filename: "logs/error.log",
      format: logFormat,
    }),
  ],
});

export default logger;

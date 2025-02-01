import { config } from "dotenv";

config();

const isProd = process.env.NODE_ENV === "prod";

export const env = {
  port: process.env.PORT || 8000,
  nodeEnv: process.env.NODE_ENV || "dev",
  logLevel: process.env.LOG_LEVEL || "info",
  allowedOrigins: process.env.ALLOWED_ORIGINS || "*",
  projectGutenbergBaseUrl:
    process.env.GUTENBERG_BASE_URL || "https://www.gutenberg.org",
  dbUri: process.env.DB_URI || "mongodb://localhost:27017/gutenberg",
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  url: isProd ? process.env.PROD_API_URL : process.env.DEV_API_URL,
};

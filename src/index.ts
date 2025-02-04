import express from "express";
import "reflect-metadata";
import { config } from "dotenv";
import { connectDB } from "./infrastructure/database/mongo";
import { env } from "./infrastructure/env";
import { Request, Response as ExpressResponse, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./adapters/routes/auth.routes";
import userRouter from "./adapters/routes/user.routes";
import { Response } from "./utils/helpers/Response";
import { LoggerMessages } from "./utils/helpers/LoggerMessages";
import { logger } from "./infrastructure/logger";
import bookRouter from "./adapters/routes/book.routes";
import gutenbergRouter from "./adapters/routes/gutenberg.route";
import groqRouter from "./adapters/routes/groq.route";

config();

const app = express();
app.use(cors({ origin: env.allowedOrigins }));
app.use(bodyParser.json());

connectDB();

// routes
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/books", bookRouter);
app.use("/gutenberg", gutenbergRouter);
app.use("/llm", groqRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Gutenberg API!");
});

app.head("/", (req, res) => {
  res.sendStatus(200);
});

app.use((req: Request, res: ExpressResponse, next: NextFunction): void => {
  logger.logFormatted("error", LoggerMessages.ROUTE_NOT_FOUND, req.originalUrl);
  Response.error(`Route ${req.method} ${req.originalUrl} not found`, 404).send(
    res
  );
  next();
});

export default app;

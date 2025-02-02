import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db/mongo";
import { env } from "./config/env";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "./config/logger";
import authRouter from "./adapters/routes/auth.routes";
import userRouter from "./adapters/routes/user.routes";

config();

const app = express();
app.use(cors({ origin: env.allowedOrigins }));
app.use(bodyParser.json());

connectDB();

// routes
app.use("/users", userRouter);
app.use("/auth", authRouter);

export default app;

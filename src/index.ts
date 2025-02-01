import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db/mongo";
import { env } from "./config/env";
import cors from "cors";

config();

const app = express();
app.use(cors({ origin: env.allowedOrigins }));

connectDB();

export default app;

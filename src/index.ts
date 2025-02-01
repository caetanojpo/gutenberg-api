import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db/mongo";
import { appConfig } from "./config/config";
import cors from "cors";

config();

const app = express();
app.use(cors({ origin: appConfig.allowedOrigins }));

connectDB();

export default app;

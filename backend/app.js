import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import healthzRoutes from "./src/routes/healthz.js";
import pasteRoutes from "./src/routes/paste.js";

const configPath = path.resolve("config", ".env");
dotenv.config({ path: configPath });

const app = express();

app.use(cors({ origin: process.env.BASE_URL, credentials: true }));
app.use(express.json());

app.use("/api/healthz", healthzRoutes);
app.use(pasteRoutes);

export default app;

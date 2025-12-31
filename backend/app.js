import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import healthzRoutes from "./src/routes/healthz.js";

const configPath = path.resolve("config", ".env");
dotenv.config({ path: configPath });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/healthz", healthzRoutes);

export default app;

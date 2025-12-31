import express from "express";
import { healthz } from "../controllers/healthzController.js";

const router = express.Router();

router.route("/").get(healthz);

export default router;

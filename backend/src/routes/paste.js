import express from "express";
import { createPaste, getPaste } from "../controllers/pastesController.js";

const router = express.Router();


router.route("/api/pastes").post(createPaste);
router.route("/api/pastes/:id").get(getPaste);



export default router;
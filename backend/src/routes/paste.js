import express from "express";
import { createPaste, getPaste, viewPasteHtml } from "../controllers/pastesController.js";

const router = express.Router();


router.route("/api/pastes").post(createPaste);
router.route("/api/pastes/:id").get(getPaste);

router.route("/p/:id").get(viewPasteHtml);



export default router;
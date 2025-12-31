import {
  addNewPaste,
  findPasteById,
  incrementViews,
} from "../models/pasteRepository.js";
import { nowMs } from "../utils/time.js";

export const createPaste = async (req, res) => {
  try {
    const { content, ttl_seconds, max_views } = req.body;

    if (!content || typeof content != "string" || content.trim() === "") {
      return res.status(400).json({ err: "content is required" });
    }

    if (
      ttl_seconds !== undefined &&
      (typeof ttl_seconds != "number" || ttl_seconds < 1)
    ) {
      return res
        .status(400)
        .json({ err: "ttl_seconds must be a positive integer" });
    }

    if (
      max_views !== undefined &&
      (typeof max_views != "number" || max_views < 1)
    ) {
      return res
        .status(400)
        .json({ err: "max_views must be a positive integer" });
    }

    const createdAt = nowMs(req);
    console.log("Created at:", createdAt);
    const expiresAt = ttl_seconds ? createdAt + ttl_seconds * 1000 : null;

    const paste = await addNewPaste({
      content,
      createdAt,
      expiresAt,
      maxViews: max_views ?? null,
      views: 0,
    });

    const url = `${process.env.BASE_URL}/p/${paste._id}`;
    res.status(201).json({ id: paste._id, url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to create paste" });
  }
};

export const getPaste = async (req, res) => {
  try {
    const { id } = req.params;
    const paste = await findPasteById(id);

    if (!paste) {
      return res.status(404).json({ err: "Paste not found" });
    }

    const now = nowMs(req);

    if (paste.expiresAt && paste.expiresAt < now) {
      return res.status(404).json({ err: "Paste expired" });
    }

    const viewsUpdate = await incrementViews(id);

    if (viewsUpdate.views > viewsUpdate.maxViews) {
      return res.status(404).json({ err: "View limit exceeded" });
    }

    console.log(viewsUpdate);

    res.status(200).json({
      content: viewsUpdate.content,
      remaining_views:
        viewsUpdate.maxViews !== null
          ? viewsUpdate.maxViews - viewsUpdate.views
          : null,
      expires_at:
        viewsUpdate.expiresAt !== null ? new Date(viewsUpdate.expiresAt) : null,
    });
  } catch (err) {
    console.log(err);
  }
};

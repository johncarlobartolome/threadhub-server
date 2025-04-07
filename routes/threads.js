import express from "express";
import { createThread, getThreads } from "../controllers/threadController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getThreads);
router.post("/post", authMiddleware, createThread);

export default router;

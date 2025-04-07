import express from "express";
import { createThread } from "../controllers/threadController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/post", authMiddleware, createThread);

export default router;

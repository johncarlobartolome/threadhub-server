import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { followUser, unfollowUser } from "../controllers/followController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/follow", authMiddleware, followUser);
router.post("/unfollow", authMiddleware, unfollowUser);

export default router;

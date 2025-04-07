import express from "express";
import {
  getProfile,
  updateProfile,
  getUserById,
  getFriends,
  getFollowers,
  getFollowing,
} from "../controllers/userController.js";
import { followUser, unfollowUser } from "../controllers/followController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/follow", authMiddleware, followUser);
router.post("/unfollow", authMiddleware, unfollowUser);
router.get("/friends", authMiddleware, getFriends);
router.get("/followers", authMiddleware, getFollowers);
router.get("/following", authMiddleware, getFollowing);
router.get("/:id", authMiddleware, getUserById);

export default router;

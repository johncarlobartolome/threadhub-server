import express from "express";
import {
  sendMagicLink,
  verifyMagicLink,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/magic-link", sendMagicLink);
router.get("/magic-login/:token", verifyMagicLink);

export default router;

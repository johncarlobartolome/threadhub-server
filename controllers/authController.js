import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { google } from "googleapis";
import User from "../models/User.js";

import {
  JWT_SECRET,
  CLIENT_URL,
  EMAIL_USER,
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN,
} from "../config.js";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: EMAIL_REFRESH_TOKEN,
});

export const sendMagicLink = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    user.magicToken = token;
    user.magicTokenExpires = expiresAt;
    await user.save();

    const accessToken = await oauth2Client.getAccessToken();

    const magicUrl = `${CLIENT_URL}/magic-login/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL_USER,
        clientId: EMAIL_CLIENT_ID,
        clientSecret: EMAIL_CLIENT_SECRET,
        refreshToken: EMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    await transporter.sendMail({
      from: `ThreadHub <${EMAIL_USER}>`,
      to: email,
      subject: "Your Magic Login Link",
      html: `
        <p>Hey there! 👋</p>
        <p>Click the magic link below to log in. It expires in 10 minutes:</p>
        <p><a href="${magicUrl}">${magicUrl}</a></p>
      `,
    });

    res.json({ success: true, message: "Magic link sent!" });
  } catch (error) {
    console.log("Error sending magic link:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const verifyMagicLink = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      magicToken: token,
      magicTokenExpires: { $gt: new Date() },
    });

    if (!user)
      return res
        .status(400)
        .json({ success: false, error: "Invalid or expired magic link" });

    user.magicToken = null;
    user.magicTokenExpires = null;
    await user.save();

    const authToken = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token: authToken,
      user: { email: user.email, id: user._id },
    });
  } catch (err) {
    console.log("Token verification failed:", err);
    res.status(400).json({ success: false, error: "Invalid or expired token" });
  }
};

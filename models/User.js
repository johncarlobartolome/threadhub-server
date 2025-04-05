import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  magicToken: {
    type: String,
    default: null,
  },
  magicTokenExpires: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  authProvider: {
    type: String,
    enum: ["magic", "google", "facebook"],
    default: "magic",
  },
});

export default mongoose.model("User", userSchema);

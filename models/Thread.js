import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  content: { type: String },
  mediaUrls: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Thread", ThreadSchema);

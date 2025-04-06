import Thread from "../models/Thread.js";

export const createThread = async (req, res) => {
  const { userId, content, mediaUrls } = req.body;
  if (!userId || (!content && mediaUrls.length === 0)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const thread = new Thread({ userId, content, mediaUrls });
    await thread.save();
    return res.status(201).json({ thread });
  } catch (error) {
    console.error("Thread creation error:", error);
    return res.status(500).json({ error: "Database error" });
  }
};

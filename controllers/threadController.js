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

export const getThreads = async (req, res) => {
  try {
    const threads = await Thread.find().sort({ createdAt: -1 });
    res.status(200).json({ threads });
  } catch (error) {
    console.error("Error fetching threads:", error);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
};

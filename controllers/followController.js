import User from "../models/User.js";

export const followUser = async (req, res) => {
  const userId = req.userId;
  const { targetUserId } = req.body;

  if (userId === targetUserId) {
    return res.status(400).json({ error: "You can't follow yourself" });
  }

  try {
    const user = await User.findById(userId);
    const target = await User.findById(targetUserId);

    if (!user || !target) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.following.includes(targetUserId)) {
      return res.status(400).json({ error: "Already following" });
    }

    user.following.push(targetUserId);
    target.followers.push(userId);

    await user.save();
    await target.save();

    res.json({ success: true, message: "Followed successfully" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

export const unfollowUser = async (req, res) => {
  const userId = req.userId;
  const { targetUserId } = req.body;

  try {
    const user = await User.findById(userId);
    const target = await User.findById(targetUserId);

    if (!user || !target) {
      return res.status(404).json({ error: "User not found." });
    }

    user.following = user.following.filter(
      (id) => id.toString() !== targetUserId
    );
    target.followers = target.followers.filter(
      (id) => id.toString() !== userId
    );

    res.json({ success: true, message: "Unfollowed succesfully" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

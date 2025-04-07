import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "name username bio email"
    );
    console.log(user);
    res.json({ success: true, user });
  } catch {
    res.status(500).json({ success: false, error: "Failed to get profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });
    res.json({ success: true, user: updated });
  } catch {
    res.status(500).json({ sucess: false, error: "Failed to get profile" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
      joinedAt: user.createdAt,
      followers: user.followers?.length || 0,
    });
  } catch (error) {
    console.error("getUserById error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getFriends = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId).populate("following");
    const friends = currentUser.following.filter((f) =>
      f.followers.includes(currentUser.userId)
    );
    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch friends." });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId).populate("followers");
    res.json(currentUser.followers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch followers" });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId).populate("following");
    res.json(currentUser.following);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch followers" });
  }
};

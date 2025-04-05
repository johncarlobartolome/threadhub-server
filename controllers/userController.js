import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "name username bio email"
    );
    res.json({ sucess: true, user });
  } catch {
    res.status(500).json({ sucess: false, error: "Failed to get profile" });
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

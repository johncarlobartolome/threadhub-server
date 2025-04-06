import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
  bio: String,
  avatar: String,
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

userSchema.pre("save", function (next) {
  if (!this.username) {
    this.username = `user${this._id.toString()}`;
  }
  next();
});

export default mongoose.model("User", userSchema);

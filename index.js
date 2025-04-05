import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { MONGO_URI, SERVER_PORT } from "./config.js";

import authRoutes from "./routes/auth.js";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("API is running..."));

const PORT = SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  tags: [String],
  transcript: { type: String },
  url: { type: String }, // For URL uploads
  filePath: { type: String }, // For local file uploads
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", videoSchema);

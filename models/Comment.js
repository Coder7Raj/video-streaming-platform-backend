const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    videoId: { type: String, required: true },
    user: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);

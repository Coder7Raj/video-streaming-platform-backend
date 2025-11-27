const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();

// Get comments for a video
router.get("/:videoId", async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add comment
router.post("/", async (req, res) => {
  const { videoId, user, text } = req.body;
  if (!videoId || !user || !text)
    return res.status(400).json({ message: "All fields required" });

  try {
    const newComment = new Comment({ videoId, user, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit comment
router.put("/:id", async (req, res) => {
  const { user, text } = req.body;
  if (!user || !text)
    return res.status(400).json({ message: "All fields required" });

  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user !== user)
      return res.status(403).json({ message: "Unauthorized" });

    comment.text = text;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete comment
router.delete("/:id", async (req, res) => {
  const { user } = req.body;
  if (!user) return res.status(400).json({ message: "User required" });

  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user !== user)
      return res.status(403).json({ message: "Unauthorized" });

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

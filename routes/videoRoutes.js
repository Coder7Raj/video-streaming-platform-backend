const express = require("express");
const router = express.Router();
const {
  uploadVideo,
  deleteVideo,
  getVideos,
  searchVideos,
} = require("../controllers/videoController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getVideos);
router.get("/search", searchVideos);
router.post("/", protect, uploadVideo);
router.delete("/:id", protect, deleteVideo);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  uploadVideo,
  deleteVideo,
  getVideos,
  searchVideos,
} = require("../controllers/videoController");
const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload route: use multer middleware
router.post("/", upload.single("video"), uploadVideo);

router.get("/", getVideos);
router.get("/search", searchVideos);
router.delete("/:id", deleteVideo);

module.exports = router;

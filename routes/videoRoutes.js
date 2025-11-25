const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {
  uploadVideo,
  deleteVideo,
  getVideos,
  searchVideos,
} = require("../controllers/videoController");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload route: handle single file ("video") or URL
router.post("/", upload.single("video"), uploadVideo);

// Other video routes
router.get("/", getVideos);
router.get("/search", searchVideos);
router.delete("/:id", deleteVideo);

module.exports = router;

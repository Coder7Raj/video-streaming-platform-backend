const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");

const {
  uploadVideo,
  deleteVideo,
  getVideos,
  searchVideos,
  updateVideo,
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

router.post("/", protect, upload.single("video"), uploadVideo);
router.get("/", getVideos);
router.get("/search", searchVideos);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

module.exports = router;

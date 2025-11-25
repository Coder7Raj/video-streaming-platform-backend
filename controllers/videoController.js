const Video = require("../models/Video");

exports.uploadVideo = async (req, res) => {
  try {
    const { user, title, description, tags, transcript, url } = req.body;

    let filePath = null;
    if (req.file) {
      // Save relative path for frontend playback
      filePath = `/uploads/${req.file.filename}`;
    }

    // Require at least one: URL or uploaded file
    if (!url && !filePath) {
      return res
        .status(400)
        .json({ error: "Please provide a video URL or upload a file." });
    }

    const video = new Video({
      user,
      title,
      description,
      tags: tags ? tags.split(",") : [],
      transcript,
      url: url || null,
      filePath,
    });

    await video.save();
    res.status(201).json(video);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    res.json({ message: "Video deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: 1 }); // oldest first
    res.json(videos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.searchVideos = async (req, res) => {
  try {
    const { query } = req.query;
    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } },
      ],
    }).limit(20);
    res.json(videos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const Video = require("../models/Video");

exports.uploadVideo = async (req, res) => {
  try {
    const { user, title, description, tags, transcript, url } = req.body;
    let filePath = null;

    if (req.file) {
      filePath = `/uploads/${req.file.filename}`; // Save the path to DB
    }

    if (!url && !filePath) {
      return res
        .status(400)
        .json({ error: "Please provide a video URL or upload a file." });
    }

    const video = new Video({
      user,
      title,
      description,
      tags,
      transcript,
      url: url || null,
      filePath,
    });

    await video.save();
    res.status(201).json(video);
  } catch (err) {
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
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Search functionality like YouTube
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

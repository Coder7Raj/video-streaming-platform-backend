const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
require("dotenv").config();
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

module.exports = app;

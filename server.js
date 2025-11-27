const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const Comment = require("./models/Comment");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Create HTTP server for Socket.IO
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" },
});

// Socket.IO real-time comment handling
io.on("connection", (socket) => {
  // console.log("User connected:", socket.id);

  socket.on("newComment", (comment) => {
    io.emit("receiveComment", comment);
  });

  socket.on("editComment", (comment) => {
    io.emit("receiveEdit", comment);
  });

  socket.on("deleteComment", (commentId) => {
    io.emit("receiveDelete", commentId);
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected:", socket.id);
  });
});

// Connect MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

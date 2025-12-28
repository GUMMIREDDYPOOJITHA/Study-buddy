const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const fs = require("fs");
const path = require("path");

// Middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create an HTTP server for Express and Socket.IO
const server = http.createServer(app);

// Socket.IO configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React front-end port
    methods: ["GET", "POST"],
  },
});

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/authDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Authentication routes
app.use("/api", authRoutes);

// Static file serving for downloads
app.use("/downloads", express.static(path.join(__dirname, "uploads")));

// Rooms tracking for Socket.IO
const rooms = {}; // Room structure to track connected users
io.on("connection", (socket) => {
  console.log("New user connected", socket.id);

  socket.on("join_room", (roomID) => {
    socket.join(roomID); // Add the user to the room
    if (!rooms[roomID]) rooms[roomID] = [];
    rooms[roomID].push(socket.id); // Track the user in the room
    io.to(roomID).emit("room_users", rooms[roomID]); // Notify everyone in the room
  });

  socket.on("send_message", (data) => {
    socket.broadcast.to(data.room).emit("receive_message", data);
  });

  socket.on("request_file", (data) => {
    socket.to(data.room).emit("file_request", {
      sender: data.sender,
      fileName: data.fileName,
      fileContent: data.fileContent,
    });
  });

  socket.on("accept_file", (data) => {
    const { room, sender, fileName, fileContent } = data;

    // Save file content to a local directory
    const filePath = path.join(__dirname, "uploads", fileName);
    const base64Data = fileContent.replace(/^data:.*;base64,/, "");
    fs.writeFileSync(filePath, base64Data, "base64");

    io.to(room).emit("file_transfer_start", {
      sender,
      fileName,
      filePath: `/downloads/${fileName}`, // Provide the file URL for download
      message: "File transfer accepted!",
    });
  });

  socket.on("decline_file", (data) => {
    io.to(data.room).emit("file_transfer_declined", {
      sender: data.sender,
      message: "File transfer declined.",
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    // Handle room cleanup logic (optional)
  });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// server.js
const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Sample REST API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend REST API!" });
});

// Optional: Custom API route (you can create routes/users.js later)
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Patience" },
    { id: 2, name: "Demo User" }
  ]);
});

// Root route (optional override if needed)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("💬 Message:", msg);
    io.emit("message", msg);
  });

  socket.on("location-share", (location) => {
    console.log("📍 Location shared:", location);
    io.emit("location", location);
  });

  socket.on("alert", (alertMsg) => {
    console.log("🚨 Alert received:", alertMsg);
    io.emit("alert", alertMsg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

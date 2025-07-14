// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3005;

const avatars = ["🐱", "🐶", "🦊", "🐸", "🐼", "🐵", "🦁", "🐯", "🐨"];
let chatLog = [];

app.use(express.static(path.join(__dirname, "public")));

// Optional: Save chat log to file
function saveChatLog() {
  fs.writeFileSync("chat-log.json", JSON.stringify(chatLog, null, 2));
}

// Optional: Load chat log from file if exists
function loadChatLog() {
  if (fs.existsSync("chat-log.json")) {
    const data = fs.readFileSync("chat-log.json");
    chatLog = JSON.parse(data);
  }
}

loadChatLog();

io.on("connection", (socket) => {
  let username = "Guest";
  let avatar = avatars[Math.floor(Math.random() * avatars.length)];

  console.log("✅ New client connected");

  socket.on("set-username", (name) => {
    username = name || username;
    socket.emit("chat-log", chatLog);
    io.emit("user-joined", {
      type: "info",
      text: `${avatar} ${username} joined the chat!",
      time: new Date().toLocaleTimeString()
    });
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing", { username, avatar });
  });

  socket.on("stop-typing", () => {
    socket.broadcast.emit("stop-typing", { username });
  });

  socket.on("message", (msg) => {
    const message = {
      type: "message",
      username,
      avatar,
      text: msg,
      time: new Date().toLocaleTimeString()
    };
    chatLog.push(message);
    saveChatLog();
    io.emit("message", message);
  });

  socket.on("location-share", (location) => {
    const message = {
      type: "location",
      username,
      avatar,
      location,
      time: new Date().toLocaleTimeString()
    };
    chatLog.push(message);
    saveChatLog();
    io.emit("location", message);
  });

  socket.on("alert", (alertMsg) => {
    const message = {
      type: "alert",
      username,
      avatar,
      text: alertMsg,
      time: new Date().toLocaleTimeString()
    };
    chatLog.push(message);
    saveChatLog();
    io.emit("alert", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
    io.emit("user-left", {
      type: "info",
      text: `${avatar} ${username} left the chat",
      time: new Date().toLocaleTimeString()
    });
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

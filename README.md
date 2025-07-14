# Real-Time Chat App (Node + Socket.IO)

A real-time chat application featuring:
- Usernames & emojis avatars
- Real-time chat messages
- Typing indicators
- Geolocation sharing
- Emergency alerts
- Persistent chat history (in-memory with optional JSON backup)

---

## ⚙️ Features
- **User join/leave notifications**
- **Typing indicators**
- **Custom events:** message, location, alert
- **Chat log** restored for new users using Socket.IO event broadcast.

---

## 🔧 Setup Instructions

1. Clone the repo:
    ```bash
    git clone <repo-url>
    cd <repo-folder>
    ```

2. Install dependencies (server):
    ```bash
    cd server
    npm install
    ```

3. Add `public/index.html` containing frontend client code.

4. Run the app (server + client):
    ```bash
    node server.js
    ```

5. Navigate to `http://localhost:3005`.

---

## 🌐 Deploy to Render

### Backend:
- Create a **Web Service** in Render → point to server folder
- Build: `npm install`
- Start: `node server.js`
- Expose port (e.g. `3005`)

### Frontend Options:
- Use existing `public` as static directory via backend, or
- Deploy `/public` as **Static Site** separately.

---

## 📌 Notes

- ⚠️ **CORS** must be configured for your frontend origin in `server.js`.
- ⚙️ Chat history persists between restarts via `chat-log.json`
- Enhance performance using Redis or a database for long-term storage.

---

## ✅ Testing

- Use multiple browser tabs:
  - Set username
  - Send messages
  - Share location
  - Trigger alerts
  - Observe real-time updates and typing indicators

---

## 📄 Submission

Ensure your GitHub repo includes:
- `server/` folder with `package.json` & `server.js`
- `public/` folder containing `index.html`
- `README.md` with setup, usage, and deployment details
- JSON `chat-log.json` (optional)

---

## 👨‍💻 Contributors

Built by Ibitokun Patience — July 2025

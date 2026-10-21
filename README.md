# BestieVerse 💖 — Ultimate Best Friends Space

BestieVerse is a modern, responsive web platform designed exclusively for best friends to play casual games, share daily thoughts, write private encrypted diaries, capture scrapbook memories, chat, and call.

## Architecture

This project is organized into dual separate frontend and backend directories:

```
djj/
├── frontend/               # React 18 + Vite Web Application
│   ├── src/
│   │   ├── components/     # Reusable UI (Sidebar, Topbar, MusicPlayer, TicTacToe, Confetti)
│   │   ├── pages/          # 9 Navigation pages (Home, Games, Diary, Memories, etc.)
│   │   ├── i18n/           # 17 Languages dictionary & RTL direction controller
│   │   └── utils/          # IndexedDB persistence (db.js) & Web Audio synthesizer
│   ├── package.json
│   └── vite.config.js
│
├── backend/                # Node.js + Express + Socket.IO Server
│   ├── server.js           # Real-time WebSocket rooms, message relay & healthcheck
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Running Locally

### 1. Run the Frontend (Vite)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Run the Backend (Express + Socket.IO)
```bash
cd backend
npm install
npm run dev
```
Runs at [http://localhost:5000](http://localhost:5000).

---

## Deployment Guide 🚀

### Deploy Frontend (Vercel / Netlify)
1. **Root Directory**: `frontend`
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. Set environment variable: `VITE_BACKEND_URL` to your deployed backend URL.

### Deploy Backend (Render / Railway)
1. **Root Directory**: `backend`
2. **Start Command**: `node server.js`
3. Set environment variable: `CLIENT_URL` to your frontend domain.

---

## Stage 1 Implemented Features

- ✨ **Homepage**: Welcoming duo hero, friendship streak counter, bestie quotes, quick jump cards, mood check-in.
- ❌⭕ **Playable Tic-Tac-Toe**: Fully interactive 2-player pass & play or smart AI, scoreboards, winning line glow, and celebration confetti.
- 📔 **My Private Diary**: Stored locally in browser **IndexedDB** for 100% privacy, 5 daily reflection questions, free-form text, mood emojis, photo attachment, draft auto-save, history search, and JSON export/import.
- 💭 **Daily Share & Think**: 100+ question bank, 5 rotating daily prompts, privacy toggles ("Only Me 🔒" vs "Share With Bestie 💗").
- 📸 **Friendship Scrapbook Memories**: Photos with captions, dates, category tags, and bucket list wishlist.
- 🎵 **Persistent Music Player**: Web Audio synthesizer with relaxing lo-fi chord progressions, volume slider, next/prev tracks, play/pause, and mute.
- 🌍 **17 Languages with RTL Support**: English, Tamil, Telugu, Hindi, Malayalam, Kannada, Bengali, Marathi, Gujarati, Punjabi, French, Spanish, German, Japanese, Korean, Chinese, and Arabic (automatic RTL layout).
- 🌓 **Sweet Light & Cosmic Dark Themes**: Instant theme toggle with CSS design tokens and glassmorphism.

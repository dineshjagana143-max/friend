import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || '*';

// Middlewares
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'BestieVerse Backend Service is alive & healthy 💖',
    timestamp: new Date().toISOString()
  });
});

// Rooms & active players in memory (prepared for Stage 3 & 4)
const activeRooms = new Map();

io.on('connection', (socket) => {
  console.log(`[Socket] Bestie connected: ${socket.id}`);

  // Create room
  socket.on('create_room', ({ roomCode, playerName }) => {
    socket.join(roomCode);
    activeRooms.set(roomCode, {
      players: [{ id: socket.id, name: playerName, symbol: 'X' }]
    });
    socket.emit('room_created', { roomCode, symbol: 'X' });
    console.log(`Room ${roomCode} created by ${playerName}`);
  });

  // Join room
  socket.on('join_room', ({ roomCode, playerName }) => {
    const room = activeRooms.get(roomCode);
    if (!room) {
      socket.emit('error_message', 'Room not found. Check the code!');
      return;
    }
    if (room.players.length >= 2) {
      socket.emit('error_message', 'Room is already full with 2 besties!');
      return;
    }

    room.players.push({ id: socket.id, name: playerName, symbol: 'O' });
    socket.join(roomCode);
    io.to(roomCode).emit('player_joined', { roomCode, players: room.players });
  });

  // Chat message
  socket.on('send_message', ({ roomCode, message }) => {
    io.to(roomCode).emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Bestie disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`💖 BestieVerse Backend server running on port ${PORT}`);
});

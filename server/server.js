import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database.js';
import app from './app.js';

connectDB();

const PORT = process.env.PORT || 5000;

/* ✅ Create HTTP server */
const httpServer = createServer(app);

/* ✅ Attach Socket.io */
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

/* ✅ Socket connection */
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  /* disconnect event */
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

/* ❗ IMPORTANT: Replace app.listen */
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

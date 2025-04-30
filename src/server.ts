import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import adminRoutes from './routes/admin';
import staffRoutes from './routes/staff';
import notificationRoutes from './routes/notifications';
import { checkComplianceExpiry } from '../scripts/checkComplianceExpiry';
import healthRoutes from './routes/health';

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// ✅ Express middlewares
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
const MONGO_URI = process.env.MONGO_URI || '';
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed', err);
    process.exit(1);
  });

// ✅ API routes
app.use('/api/admin', adminRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/health', healthRoutes);

// ✅ Socket.IO user map
const userSocketMap = new Map<string, string>();

io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);

  socket.on('register', (userId: string) => {
    userSocketMap.set(userId, socket.id);
    console.log(`📥 User ${userId} registered to socket ${socket.id}`);
  });

  socket.on('disconnect', () => {
    for (const [userId, id] of userSocketMap.entries()) {
      if (id === socket.id) {
        userSocketMap.delete(userId);
        console.log(`❌ User ${userId} disconnected`);
      }
    }
  });
});

// ✅ Exported function to send notifications
export const sendNotification = (userId: string, message: string) => {
  const socketId = userSocketMap.get(userId);
  if (socketId) {
    io.to(socketId).emit('notification', {
      message,
      timestamp: new Date().toISOString(),
    });
  }
};

// ✅ Background Compliance Expiry Check every 6 hours
const SIX_HOURS_MS = 1000 * 60 * 60 * 6;

const startComplianceChecker = () => {
  console.log('🛠️ Starting compliance expiry checker...');
  checkComplianceExpiry().catch((err) => console.error('❌ Compliance check failed', err));

  setInterval(() => {
    console.log('🕕 Running scheduled compliance expiry check...');
    checkComplianceExpiry().catch((err) => console.error('❌ Compliance check failed', err));
  }, SIX_HOURS_MS);
};

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  startComplianceChecker(); // Start expiry checker once server is ready
});

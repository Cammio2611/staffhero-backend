"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const admin_1 = __importDefault(require("./routes/admin"));
const staff_1 = __importDefault(require("./routes/staff"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const checkComplianceExpiry_1 = require("../scripts/checkComplianceExpiry");
const health_1 = __importDefault(require("./routes/health"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// ✅ Socket.IO setup
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
// ✅ Express middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ✅ MongoDB connection
const MONGO_URI = process.env.MONGO_URI || '';
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => {
    console.error('❌ MongoDB connection failed', err);
    process.exit(1);
});
// ✅ API routes
app.use('/api/admin', admin_1.default);
app.use('/api/staff', staff_1.default);
app.use('/api/notifications', notifications_1.default);
app.use('/api/health', health_1.default);
// ✅ Socket.IO user map
const userSocketMap = new Map();
io.on('connection', (socket) => {
    console.log('🔌 Socket connected:', socket.id);
    socket.on('register', (userId) => {
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
const sendNotification = (userId, message) => {
    const socketId = userSocketMap.get(userId);
    if (socketId) {
        io.to(socketId).emit('notification', {
            message,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.sendNotification = sendNotification;
// ✅ Background Compliance Expiry Check every 6 hours
const SIX_HOURS_MS = 1000 * 60 * 60 * 6;
const startComplianceChecker = () => {
    console.log('🛠️ Starting compliance expiry checker...');
    (0, checkComplianceExpiry_1.checkComplianceExpiry)().catch((err) => console.error('❌ Compliance check failed', err));
    setInterval(() => {
        console.log('🕕 Running scheduled compliance expiry check...');
        (0, checkComplianceExpiry_1.checkComplianceExpiry)().catch((err) => console.error('❌ Compliance check failed', err));
    }, SIX_HOURS_MS);
};
// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    startComplianceChecker(); // Start expiry checker once server is ready
});

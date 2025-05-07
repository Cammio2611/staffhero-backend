"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const socket_io_client_1 = require("socket.io-client");
const sendNotification = (userId, message) => {
    const socket = (0, socket_io_client_1.io)("https://staffhero-backend.onrender.com");
    socket.emit("notification", {
        userId,
        message,
        time: new Date().toLocaleTimeString(),
    });
    socket.disconnect();
};
exports.sendNotification = sendNotification;

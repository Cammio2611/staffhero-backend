"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
// src/backend/socket.ts
var socket_io_1 = require("socket.io");
var io;
var initSocket = function (server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });
    io.on("connection", function (socket) {
        console.log("Socket connected:", socket.id);
        socket.emit("new_notification", "Welcome back!");
    });
};
exports.initSocket = initSocket;
var getIO = function () {
    if (!io) {
        throw new Error("Socket.io server not initialized");
    }
    return io;
};
exports.getIO = getIO;

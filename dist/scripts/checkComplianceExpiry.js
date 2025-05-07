"use strict";
// scripts/checkComplianceExpiry.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socket_1 = require("../src/backend/socket");
const notifications_1 = require("../src/backend/notifications");
// Dummy logic — replace with actual DB check
const checkExpiringStaff = () => {
    return [
        { name: "John Doe", role: "HCA", expiryDate: "2025-05-10" },
        { name: "Jane Smith", role: "RGN", expiryDate: "2025-05-12" },
    ];
};
const app = express();
const server = http.createServer(app);
const run = async () => {
    (0, socket_1.initSocket)(server);
    const expiringStaff = checkExpiringStaff();
    for (const staff of expiringStaff) {
        const message = `${staff.name}'s compliance expires on ${staff.expiryDate}`;
        (0, notifications_1.notifyAdmins)(message);
    }
    // Allow time for notifications to send before exiting
    setTimeout(() => {
        const io = (0, socket_1.getIO)();
        io.close();
        server.close(() => process.exit(0));
    }, 1000);
};
run().catch((err) => {
    console.error("Error checking compliance:", err);
    process.exit(1);
});

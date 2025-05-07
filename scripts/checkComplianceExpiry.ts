// scripts/checkComplianceExpiry.ts

const express = require("express");
const http = require("http");

import { initSocket, getIO } from "../src/backend/socket";
import { notifyAdmins } from "../src/backend/notifications";

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
  initSocket(server);

  const expiringStaff = checkExpiringStaff();

  for (const staff of expiringStaff) {
    const message = `${staff.name}'s compliance expires on ${staff.expiryDate}`;
    notifyAdmins(message);
  }

  // Allow time for notifications to send before exiting
  setTimeout(() => {
    const io = getIO();
    io.close();
    server.close(() => process.exit(0));
  }, 1000);
};

run().catch((err: any) => {
  console.error("Error checking compliance:", err);
  process.exit(1);
});

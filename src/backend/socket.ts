// src/backend/socket.ts
import { Server } from "socket.io";
import { Server as HTTPServer } from "http";

let io: Server;

export const initSocket = (server: HTTPServer) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.emit("new_notification", "Welcome back!");
  });
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io server not initialized");
  }
  return io;
};

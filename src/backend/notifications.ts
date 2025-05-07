// src/backend/notifications.ts
import { getIO } from "./socket";

export const notifyAdmins = (message: string) => {
  const io = getIO();
  io.emit("new_notification", message);
};

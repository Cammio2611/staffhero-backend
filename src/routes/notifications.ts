import express, { Request, Response } from "express";

const router = express.Router();

export const registerNotificationRoutes = (io: any) => {
  router.post("/test-notification", (req: Request, res: Response) => {
    const { message, time } = req.body;

    io.emit("notification", {
      message: message || "New shift available at Willow Lodge",
      time: time || "Just now",
    });

    res.status(200).json({ status: "Notification sent" });
  });

  return router;
};

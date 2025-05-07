"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const registerNotificationRoutes = (io) => {
    router.post("/test-notification", (req, res) => {
        const { message, time } = req.body;
        io.emit("notification", {
            message: message || "New shift available at Willow Lodge",
            time: time || "Just now",
        });
        res.status(200).json({ status: "Notification sent" });
    });
    return router;
};
exports.registerNotificationRoutes = registerNotificationRoutes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // ✅ LOAD .env VARIABLES BEFORE USING THEM
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const socket_1 = require("./backend/socket");
const staff_1 = __importDefault(require("./routes/staff"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = [
    "http://localhost:5173",
    "https://staffhero-frontend.vercel.app",
];
if (isProduction) {
    app.use((0, helmet_1.default)());
}
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        const isPreview = origin?.endsWith(".vercel.app");
        if (!origin || allowedOrigins.includes(origin) || isPreview) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/staff", staff_1.default);
app.use("/api/auth", auth_1.default);
// Optional 404 fallback
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});
const server = http_1.default.createServer(app);
(0, socket_1.initSocket)(server);
server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

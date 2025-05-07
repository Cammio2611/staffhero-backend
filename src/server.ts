import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env before anything else

import mongoose from "mongoose"; // ✅ Connect to DB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import { initSocket } from "./backend/socket";
import staffRoutes from "./routes/staff";
import authRoutes from "./routes/auth";
import adminTools from "./routes/adminTools";

const app = express();
const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = [
  "http://localhost:5173",
  "https://staffhero-frontend.vercel.app",
];

if (isProduction) {
  app.use(helmet());
}

app.use(cors({
  origin: (origin, callback) => {
    const isPreview = origin?.endsWith(".vercel.app");
    if (!origin || allowedOrigins.includes(origin) || isPreview) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/staff", staffRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminTools);

// Optional 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const server = http.createServer(app);
initSocket(server);

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

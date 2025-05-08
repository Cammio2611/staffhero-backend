"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// POST /api/auth/register
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("📥 Register attempt:", email);
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const existing = await User_1.default.findOne({ email });
        if (existing) {
            console.log("⚠️ Email already exists");
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const user = new User_1.default({
            email,
            password: hashedPassword,
            role: "candidate",
            isCompliant: false,
            profilePhoto: "",
            sectors: [],
            availability: [],
            ratings: [],
            favoriteClients: [],
            requiredDocuments: [],
        });
        await user.save();
        console.log("✅ User registered:", user._id);
        res.status(201).json({ message: "Registered successfully" });
    }
    catch (err) {
        console.error("❌ Register error:", err);
        res.status(500).json({ error: "Server error during registration" });
    }
});
// POST /api/auth/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("🔐 Login attempt:", email);
        const user = await User_1.default.findOne({ email });
        if (!user) {
            console.log("❌ No user found");
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Password mismatch");
            return res.status(401).json({ error: "Invalid email or password" });
        }
        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET is missing in env");
            return res.status(500).json({ error: "JWT secret not configured." });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        console.log("✅ Login successful for", user._id);
        res.json({ token });
    }
    catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ error: "Server error during login" });
    }
});
exports.default = router;

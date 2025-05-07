"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/seed/usersSeeder.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const usersSeeder = async () => {
    try {
        await User_1.default.deleteMany(); // Clear old users (optional)
        const salt = await bcryptjs_1.default.genSalt(10);
        const users = [
            {
                name: 'Admin User',
                email: 'admin@staffhero.com',
                password: await bcryptjs_1.default.hash('password123', salt),
                role: 'admin',
                isCompliant: true,
                sectors: ['Healthcare', 'Education'],
            },
            {
                name: 'Healthcare Worker 1',
                email: 'worker1@staffhero.com',
                password: await bcryptjs_1.default.hash('password123', salt),
                role: 'candidate',
                isCompliant: true,
                sectors: ['Healthcare'],
            },
            {
                name: 'Education Worker 1',
                email: 'worker2@staffhero.com',
                password: await bcryptjs_1.default.hash('password123', salt),
                role: 'candidate',
                isCompliant: false,
                sectors: ['Education'],
            },
            {
                name: 'Client User',
                email: 'client@staffhero.com',
                password: await bcryptjs_1.default.hash('password123', salt),
                role: 'client',
                isCompliant: true,
                sectors: ['Healthcare', 'SEN'],
            },
        ];
        await User_1.default.insertMany(users);
        console.log('✅ Users seeded successfully.');
    }
    catch (error) {
        console.error('❌ Error seeding users:', error);
    }
};
exports.default = usersSeeder;

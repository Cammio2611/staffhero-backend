"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const shiftsSeeder_1 = require("./shiftsSeeder"); // ✅ correct import
dotenv_1.default.config();
const seedDatabase = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected');
        // Run only shiftsSeeder for now
        await (0, shiftsSeeder_1.shiftsSeeder)();
        console.log('✅ Seeding completed!');
        process.exit();
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};
seedDatabase();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftsSeeder = void 0;
const Shift_1 = __importDefault(require("../models/Shift"));
const shiftsSeeder = async () => {
    try {
        const sampleShifts = [
            {
                clientName: 'Care Home A',
                role: 'Healthcare Assistant',
                location: 'London',
                date: new Date('2025-05-05'),
                startTime: '08:00',
                endTime: '14:00',
                hourlyRate: 15,
            },
            {
                clientName: 'School B',
                role: 'Teaching Assistant',
                location: 'Manchester',
                date: new Date('2025-05-06'),
                startTime: '09:00',
                endTime: '15:30',
                hourlyRate: 14,
            },
        ];
        await Shift_1.default.insertMany(sampleShifts);
        console.log('✅ Shifts seeded successfully!');
    }
    catch (error) {
        console.error('❌ Error seeding shifts:', error);
    }
};
exports.shiftsSeeder = shiftsSeeder;

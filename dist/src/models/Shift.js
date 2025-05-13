"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Shift.ts
const mongoose_1 = __importStar(require("mongoose"));
const ShiftSchema = new mongoose_1.Schema({
    clientName: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    assignedWorkerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: false },
    bookedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', default: null },
    status: { type: String, enum: ['open', 'booked', 'completed', 'cancelled'], default: 'open' },
    notes: { type: String },
    expenses: { type: Number, default: 0 },
}, {
    timestamps: true,
});
const Shift = mongoose_1.default.model('Shift', ShiftSchema);
exports.default = Shift;

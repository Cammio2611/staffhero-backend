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
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "client", "candidate"], default: "candidate" },
    isCompliant: { type: Boolean, default: false },
    profilePhoto: { type: String },
    sectors: { type: [String], default: [] },
    availability: { type: [String], default: [] },
    ratings: [
        {
            clientId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
            rating: { type: Number, min: 1, max: 5 },
        },
    ],
    favoriteClients: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    requiredDocuments: [
        {
            name: { type: String, required: true },
            mandatory: { type: Boolean, default: true },
            uploaded: { type: Boolean, default: false },
            verified: { type: Boolean, default: false },
            fileUrl: { type: String },
            uploadDate: { type: Date },
            expiryDate: { type: Date },
        },
    ],
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;

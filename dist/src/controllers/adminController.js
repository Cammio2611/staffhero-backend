"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserComplianceStatus = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUserComplianceStatus = async (req, res) => {
    try {
        const users = await User_1.default.find();
        const complianceData = users.map(user => {
            const missingDocs = user.requiredDocuments
                .filter(doc => doc.mandatory && (!doc.uploaded || (doc.expiryDate && new Date(doc.expiryDate) < new Date())))
                .map(doc => ({
                name: doc.name,
                expired: doc.expiryDate ? new Date(doc.expiryDate) < new Date() : false,
            }));
            return {
                id: user._id,
                email: user.email,
                role: user.role,
                isCompliant: user.isCompliant,
                missingDocuments: missingDocs,
            };
        });
        res.json(complianceData);
    }
    catch (error) {
        console.error('Error fetching user compliance:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getUserComplianceStatus = getUserComplianceStatus;

"use strict";
// src/controllers/onboardingController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOnboardingEmail = void 0;
const Onboarding_1 = __importDefault(require("../models/Onboarding"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendOnboardingEmail = async (req, res) => {
    const { email, fullName, sector } = req.body;
    if (!email || !fullName) {
        return res.status(400).json({ message: "Email and full name are required" });
    }
    try {
        // Create onboarding record in MongoDB
        const onboarding = new Onboarding_1.default({
            email,
            fullName,
            sector,
            status: 'Pending',
        });
        await onboarding.save();
        // Create a unique onboarding link
        const onboardingLink = `${process.env.FRONTEND_URL}/onboarding/${onboarding._id}`;
        // Send onboarding email
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // App-specific password
            },
        });
        await transporter.sendMail({
            from: `"StaffHero Onboarding" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Complete Your StaffHero Onboarding',
            html: `
        <h2>Welcome to StaffHero!</h2>
        <p>Hi ${fullName},</p>
        <p>Click the link below to complete your onboarding:</p>
        <a href="${onboardingLink}">${onboardingLink}</a>
        <p>If you did not request this, you can safely ignore it.</p>
      `,
        });
        res.status(200).json({ message: 'Onboarding email sent successfully.' });
    }
    catch (error) {
        console.error('Error sending onboarding email:', error);
        res.status(500).json({ message: 'Failed to send onboarding email.' });
    }
};
exports.sendOnboardingEmail = sendOnboardingEmail;

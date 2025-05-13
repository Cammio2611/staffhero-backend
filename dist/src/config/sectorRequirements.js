"use strict";
// backend/src/config/sectorRequirements.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectorRequirements = void 0;
exports.sectorRequirements = {
    Healthcare: [
        { name: "Right to Work", mandatory: true },
        { name: "Enhanced DBS", mandatory: true, expiresAfterMonths: 12 },
        { name: "Manual Handling Certificate", mandatory: true, expiresAfterMonths: 12 },
        { name: "Care Certificate", mandatory: false },
        { name: "COVID Vaccination Proof", mandatory: false },
        { name: "Proof of Identity", mandatory: true },
        { name: "Proof of Address", mandatory: true },
        { name: "Medication Administration", mandatory: true, expiresAfterMonths: 12 },
        { name: "Basic Life Skills", mandatory: true },
        { name: "Dignity in Care", mandatory: true },
        { name: "Equality & Diversity", mandatory: true },
        { name: "Fire Safety", mandatory: true },
        { name: "First Aid at Work", mandatory: true, expiresAfterMonths: 36 },
        { name: "Food Hygiene", mandatory: true, expiresAfterMonths: 12 },
        { name: "Health & Safety", mandatory: true },
        { name: "Infection Prevention & Control", mandatory: true, expiresAfterMonths: 12 },
        { name: "Mental Capacity/ DOLS", mandatory: true },
        { name: "Nutrition & Hydration", mandatory: true },
        { name: "Oral Health", mandatory: true },
        { name: "Person-Centered Care", mandatory: true },
        { name: "Record Keeping", mandatory: true },
        { name: "Safeguarding Adults", mandatory: true, expiresAfterMonths: 24 }
    ],
    Education: [
        { name: "Passport", mandatory: true },
        { name: "Enhanced DBS (Child Workforce)", mandatory: true, expiresAfterMonths: 12 },
        { name: "Safeguarding Level 1", mandatory: true, expiresAfterMonths: 24 },
        { name: "Qualified Teacher Status (QTS)", mandatory: false }
    ],
    SEN: [
        { name: "Passport", mandatory: true },
        { name: "Enhanced DBS (Child & Adult Workforce)", mandatory: true, expiresAfterMonths: 12 },
        { name: "SEN Specialism Certificate", mandatory: true }
    ],
    SocialCare: [
        { name: "Passport", mandatory: true },
        { name: "Enhanced DBS (Adult Workforce)", mandatory: true, expiresAfterMonths: 12 },
        { name: "Moving & Handling Certificate", mandatory: true, expiresAfterMonths: 12 }
    ]
};

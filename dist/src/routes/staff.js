"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staffController_1 = require("../controllers/staffController");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: {
        folder: 'staff-profile-photos',
        allowed_formats: ['jpg', 'png'],
    },
});
const upload = (0, multer_1.default)({ storage });
const router = express_1.default.Router();
router.get('/dashboard', auth_1.authenticateStaff, staffController_1.getStaffDashboard);
router.post('/upload-photo', auth_1.authenticateStaff, upload.single('photo'), staffController_1.uploadProfilePhoto);
exports.default = router;

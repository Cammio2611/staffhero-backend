"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/availability', auth_1.authenticateStaff, userController_1.updateAvailability);
router.post('/compliance', auth_1.authenticateStaff, userController_1.updateCompliance);
router.get('/profile', auth_1.authenticateStaff, userController_1.getUserProfile);
exports.default = router;

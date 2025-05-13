"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shiftController_1 = require("../controllers/shiftController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/available', auth_1.authenticateStaff, shiftController_1.getAvailableShifts);
router.post('/book', auth_1.authenticateStaff, shiftController_1.bookShift);
router.post('/cancel', auth_1.authenticateStaff, shiftController_1.cancelShift);
router.get('/my-shifts', auth_1.authenticateStaff, shiftController_1.getShifts);
exports.default = router;

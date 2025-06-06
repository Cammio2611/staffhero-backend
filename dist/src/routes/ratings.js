"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ratingController_1 = require("../controllers/ratingController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/rate', auth_1.authenticateStaff, ratingController_1.rateCandidate);
exports.default = router;

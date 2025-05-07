"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../middleware/multer"));
const uploadController_1 = require("../controllers/uploadController");
const router = express_1.default.Router();
router.post('/', multer_1.default.single('file'), uploadController_1.uploadDocument);
exports.default = router;

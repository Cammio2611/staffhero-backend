// routes/upload.ts
import express from 'express';
import multer from 'multer';
import { uploadDocument } from '../controllers/uploadController';
import { authenticateStaff } from '../middleware/auth';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/document', authenticateStaff, upload.single('document'), uploadDocument);

export default router;
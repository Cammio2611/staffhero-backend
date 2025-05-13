import express from 'express';
import { uploadDocument } from '../controllers/uploadController';
import { authenticateStaff } from '../middleware/auth';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/document', authenticateStaff, upload.single('document'), uploadDocument);

export default router;

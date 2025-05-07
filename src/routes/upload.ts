import express, { RequestHandler } from 'express';
import upload from '../middleware/multer';
import { uploadDocument } from '../controllers/uploadController';

const router = express.Router();

router.post('/', upload.single('file'), uploadDocument as RequestHandler);

export default router;

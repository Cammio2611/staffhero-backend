import express from 'express';
import multer from 'multer';
import { handleFileUpload } from '../controllers/uploadController';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', upload.single('file'), handleFileUpload);

export default router;

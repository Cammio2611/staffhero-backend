import express from 'express';
import multer from 'multer';
import { uploadDocument } from '../controllers/uploadController';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), uploadDocument);

export default router;

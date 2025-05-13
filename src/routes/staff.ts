// routes/staff.ts
import express from 'express';
import { authenticateStaff } from '../middleware/auth';
import {
  getStaffDashboard,
  uploadProfilePhoto
} from '../controllers/staffController';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'staffhero-profile-photos',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 300, height: 300, crop: 'fill' }]
  }
});

const upload = multer({ storage });

router.get('/dashboard', authenticateStaff, getStaffDashboard);
router.post('/profile-photo', authenticateStaff, upload.single('avatar'), uploadProfilePhoto);

export default router;
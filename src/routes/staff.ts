import express from 'express';
import { getStaffDashboard, uploadProfilePhoto } from '../controllers/staffController';
import { authenticateStaff } from '../middleware/auth';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'staff-profile-photos',
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/dashboard', authenticateStaff, getStaffDashboard);
router.post('/upload-photo', authenticateStaff, upload.single('photo'), uploadProfilePhoto);

export default router;

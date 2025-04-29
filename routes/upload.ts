import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up multer for file storage (local folder for now)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // you need to create "uploads" folder manually
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Upload endpoint
router.post('/profile-picture', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ fileUrl }); // send back the file URL to save it to user's profile
});

export default router;

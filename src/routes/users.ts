import express, { RequestHandler } from 'express';
import {
  getAllUsers,
  updateCompliance,
  updateAvailability,
} from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers as RequestHandler);
router.put('/compliance', updateCompliance as RequestHandler);
router.put('/availability', updateAvailability as RequestHandler);

export default router;

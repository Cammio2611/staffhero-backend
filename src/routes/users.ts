import express from 'express';
import { updateCompliance, getAllUsers } from '../controllers/userController';
import { updateAvailability } from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers);
router.put('/compliance', updateCompliance);
router.put('/availability', updateAvailability);

export default router;

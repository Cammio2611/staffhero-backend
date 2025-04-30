import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.get('/some-route', myHandler); // not myHandler(req, res);

export default router;

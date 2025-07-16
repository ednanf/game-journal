import express from 'express';
import { xss } from 'express-xss-sanitizer';
import authController from '../controllers/auth.js';

const router = express.Router();
const { register, login, logout } = authController;

router.post('/register', xss(), register);
router.post('/login', xss(), login);
router.get('/logout', xss(), logout);

export default router;

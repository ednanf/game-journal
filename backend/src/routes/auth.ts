import express from 'express';
import { xss } from 'express-xss-sanitizer';
import authController from '../controllers/auth.js';
import authentication from '../middleware/authentication.js';

const router = express.Router();
const { register, login, logout, deleteUser } = authController;

router.post('/register', xss(), register);
router.post('/login', xss(), login);
router.get('/logout', logout);
router.delete('/deleteUser', authentication, deleteUser);

export default router;

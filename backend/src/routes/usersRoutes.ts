import express from 'express';
import { registerUser, loginUser, logoutUser, deleteUser } from '../controllers/usersController.js';
import requiresAuthentication from '../middlewares/requiresAuthentication.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.delete('/delete', requiresAuthentication, deleteUser);

export default router;

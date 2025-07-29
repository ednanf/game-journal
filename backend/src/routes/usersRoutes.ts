import express from 'express';
import { registerUser, loginUser, logoutUser, deleteUser } from '../controllers/usersController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.delete('/delete', authenticate, deleteUser);

export default router;

import express from 'express';
import { xss } from 'express-xss-sanitizer';
import { registerUser, loginUser, logoutUser, deleteUser } from '../controllers/usersController.js';
import authenticate from '../middlewares/authenticate.js';
import validateZodSchemas from '../middlewares/validateZodSchemas.js';
import { registerUserBodySchema, loginUserBodySchema } from '../schemas/userSchemas.js';

const router = express.Router();

router.post('/register', xss(), validateZodSchemas(registerUserBodySchema), registerUser);
router.post('/login', xss(), validateZodSchemas(loginUserBodySchema), loginUser);
router.post('/logout', logoutUser);
router.delete('/delete', authenticate, deleteUser);

export default router;

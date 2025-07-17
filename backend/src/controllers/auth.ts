import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../errors/HttpError.js';
import comparePasswords from '../utils/comparePasswords.js';
import User from '../models/User.js';

// Use _req or _res to avoid unused variable warnings when unused!

const register = async (req: Request, res: Response) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ token, user: user.username });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ error: 'Unknow error occurred' });
    }
  }
};

const login = async (req: Request, res: Response) => {
  // Validate the request body
  const { email, password } = req.body;
  if (!email || !password) {
    throw new HttpError(StatusCodes.BAD_REQUEST, 'Please provide email and password');
  }

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(StatusCodes.BAD_REQUEST, 'Invalid email or password');
  }

  // Compare the provided password with the stored password hash
  const isPasswordCorrect = await comparePasswords(password, user.passwordHash);
  if (!isPasswordCorrect) {
    throw new HttpError(StatusCodes.BAD_REQUEST, 'Invalid email or password');
  }

  // If the user is found and the password is correct, create a JWT token
  const token = user.createJWT();

  // Respond with the token and user information
  res.status(StatusCodes.OK).json({ token, user: user.username });
};

const logout = (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: 'User logged out successfully' });
};

export default {
  register,
  login,
  logout,
};

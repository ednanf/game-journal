import { Request, Response } from 'express';
import { ApiResponse, RegisterUserSuccess } from '../types/api.js';

const registerUser = async (req: Request, res: Response) => {
  const response: ApiResponse<RegisterUserSuccess> = {
    status: 'success',
    data: {
      user: 'newUser',
      token: 'newUserToken',
      message: 'User registered successfully',
    },
  };

  res.status(201).json(response);
};

const loginUser = async (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: { message: 'User logged in successfully' },
  });
};

const logoutUser = async (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: { message: 'User logged out successfully' },
  });
};

const deleteUser = async (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: { message: 'User deleted successfully' },
  });
};

export { registerUser, loginUser, logoutUser, deleteUser };

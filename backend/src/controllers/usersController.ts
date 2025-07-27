import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User, { IUserDocument } from '../models/User.js';
import type { ApiError, ApiResponse, RegisterUserSuccess } from '../types/api.js';

// TODO: Implement user controller functions
// TODO: Ensure error handling is in place - both mongoose errors and http errors - review with copilot
// TODO: Create user routes in Postman

// Type guards for proper error handling
function isMongooseValidationError(error: unknown): error is {
  name: string;
  errors: Record<string, { message: string }>;
} {
  // Check if the error is an object (and not null) and has a 'name' property equal to 'ValidationError'
  // (error as any).name is necessary because we can't access .name on unknown without first proving it exists
  return typeof error === 'object' && error !== null && (error as any).name === 'ValidationError';
}

function isMongoDuplicateError(
  error: unknown,
): error is { code: number; keyPattern?: Record<string, any> } {
  // Check if the error is an object (and not null) and has a 'code' property equal to 11000
  // (error as any).code is necessary because we can't access .code on unknown without first proving it exists
  // 11000 is the MongoDB error code for duplicate key errors
  return typeof error === 'object' && error !== null && (error as any).code === 11000;
}

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUserDocument = await User.create({ ...req.body });
    const token: string = await user.createJWT(); // Uses the user model's method to create a JWT
    const response: ApiResponse<RegisterUserSuccess> = {
      status: 'success',
      data: {
        message: 'User registered successfully',
        user: user.email,
        token,
      },
    };

    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error registering user:', error);

    // Mongoose validation error handling
    if (isMongooseValidationError(error)) {
      const messages: string[] = Object.values(error.errors).map(
        (err: { message: string }): string => err.message,
      );
      const response: ApiResponse<ApiError> = {
        status: 'error',
        data: { message: messages.join(', ') },
      };

      res.status(StatusCodes.BAD_REQUEST).json(response);
      return;
    }

    // Duplicate email handling
    if (isMongoDuplicateError(error) && error.keyPattern?.email) {
      const response: ApiResponse<ApiError> = {
        status: 'error',
        data: { message: 'Email already in use.' },
      };

      res.status(StatusCodes.CONFLICT).json(response);
      return;
    }

    // Generic fallback for other errors
    const response: ApiResponse<ApiError> = {
      status: 'error',
      data: { message: 'An unexpected error occurred. Please try again later.' },
    };

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
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

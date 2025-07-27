import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import comparePasswords from '../utils/comparePasswords.js';
import User, { IUserDocument } from '../models/User.js';
import type { ApiResponse, RegisterUserSuccess, LoginUserSuccess } from '../types/api.js';
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  UnauthorizedError,
} from '../errors/index.js';

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

const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
      next(new BadRequestError(messages.join(' ')));
      return;
    }

    // Duplicate email handling
    if (isMongoDuplicateError(error) && error.keyPattern?.email) {
      next(new ConflictError('Email already in use.'));
      return;
    }

    // Generic fallback for other errors
    next(new InternalServerError('An unexpected error occurred. Please try again later.'));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Validate email and password presence
    if (!email || !password) {
      const fieldErrors: Record<'email' | 'password', string | undefined> = {
        email: !email ? 'An email is required' : undefined,
        password: !password ? 'Password is required' : undefined,
      };

      next(new BadRequestError(JSON.stringify(fieldErrors)));
      return;
    }

    // Find user by email
    const user: IUserDocument | null = await User.findOne({ email });
    if (!user) {
      // Generic error message for security reasons
      next(new UnauthorizedError('Invalid email or password'));
      return;
    }

    // Compare provided password with stored hashed password
    const isPasswordValid: boolean = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      // Generic error message for security reasons
      next(new UnauthorizedError('Invalid email or password'));
      return;
    }

    // If the user is found and the password matches, create a JWT
    const token: string = await user.createJWT();

    const response: ApiResponse<LoginUserSuccess> = {
      status: 'success',
      data: {
        message: 'User logged in successfully',
        user: user.email,
        token,
      },
    };

    res.status(StatusCodes.OK).json({ response });
  } catch (error) {
    next(error);
  }
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

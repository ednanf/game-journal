import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import comparePasswords from '../utils/comparePasswords.js';
import User, { IUserDocument } from '../models/User.js';
import JournalEntry from '../models/JournalEntry.js';
import type {
  ApiResponse,
  RegisterUserSuccess,
  LoginUserSuccess,
  LogoutUserSuccess,
  DeleteUserSuccess,
} from '../types/api.js';
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  UnauthorizedError,
  NotFoundError,
} from '../errors/index.js';

// Type guards for proper error handling
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
    // Mongoose creates a new user and assigns a unique _id (our userId).
    // This _id is the single source of truth for user identity in our system.
    const { email, password } = req.body; // Validated by Zod in the middleware
    const user: IUserDocument = await User.create({ email, password });

    const token: string = await user.createJWT(); // Uses the user model to create a JWT adding _id as userId
    const response: ApiResponse<RegisterUserSuccess> = {
      status: 'success',
      data: {
        message: 'User registered successfully',
        user: user.email,
        token,
      },
    };

    // Send the JWT (with userId inside) to the client.
    // The client will present this token as proof of identity on future requests.
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    if (isMongoDuplicateError(error) && error.keyPattern?.email) {
      next(new ConflictError('Email already in use.'));
      return;
    }

    next(new InternalServerError('An unexpected error occurred. Please try again later.'));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body; // Validated by Zod in the middleware

  try {
    if (!email || !password) {
      const fieldErrors: Record<'email' | 'password', string | undefined> = {
        email: !email ? 'An email is required' : undefined,
        password: !password ? 'Password is required' : undefined,
      };

      next(new BadRequestError(JSON.stringify(fieldErrors)));
      return;
    }

    const user: IUserDocument | null = await User.findOne({ email });
    if (!user) {
      next(new UnauthorizedError('Invalid email or password'));
      return;
    }

    const isPasswordValid: boolean = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
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

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (_req: Request, res: Response) => {
  const response: ApiResponse<LogoutUserSuccess> = {
    status: 'success',
    data: { message: 'User logged out successfully' },
  };

  res.status(StatusCodes.OK).json(response);
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string | undefined = req.user?.userId;
    if (!userId) {
      next(new UnauthorizedError('User not authenticated'));
      return;
    }

    const userToDelete: IUserDocument | null = await User.findByIdAndDelete(userId);
    if (!userToDelete) {
      next(new NotFoundError(`User with ID ${userId} not found`));
      return;
    }

    await JournalEntry.deleteMany({ createdBy: userId });

    const response: ApiResponse<DeleteUserSuccess> = {
      status: 'success',
      data: {
        message: 'User deleted successfully',
      },
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, logoutUser, deleteUser };

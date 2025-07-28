import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import comparePasswords from '../utils/comparePasswords.js';
import User, { IUserDocument } from '../models/User.js';
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
    // Mongoose creates a new user and assigns a unique _id (our userId).
    // This _id is the single source of truth for user identity in our system.
    const user: IUserDocument = await User.create({ ...req.body });
    const token: string = await user.createJWT(); // Uses the user model's to create a JWT adding _id as userId
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
    if (isMongooseValidationError(error)) {
      const messages: string[] = Object.values(error.errors).map(
        (err: { message: string }): string => err.message,
      );
      next(new BadRequestError(messages.join(' ')));
      return;
    }

    if (isMongoDuplicateError(error) && error.keyPattern?.email) {
      next(new ConflictError('Email already in use.'));
      return;
    }

    next(new InternalServerError('An unexpected error occurred. Please try again later.'));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

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

    // TODO: Implement journal entry deletion logic after creating journal entry model

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

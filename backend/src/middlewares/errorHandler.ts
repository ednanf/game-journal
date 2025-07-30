import { Request, Response, NextFunction } from 'express';
import type { ApiError, ApiResponse } from '../types/api.js';
import { HttpError } from '../errors/index.js';

// Error handler middleware for express.
// This middleware catches errors thrown in the application and formats them into a consistent JSON response.
// It sets the HTTP status code based on the error and includes a message in the response body.
// If the error does not have a specific code, it defaults to 500 (Internal Server Error).
const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  // Check for HttpError for custom error handling
  if (err instanceof HttpError) {
    const response: ApiResponse<ApiError> = {
      status: 'error',
      data: {
        message: err.message,
      },
    };

    res.status(err.statusCode).json(response); // uses the status code from the HttpError
    return;
  }

  // Fallback for non-custom errors
  const response: ApiResponse<ApiError> = {
    status: 'error',
    data: {
      message: err.message || 'Internal Server Error',
    },
  };

  res.status(500).json(response);
};

export default errorHandler;

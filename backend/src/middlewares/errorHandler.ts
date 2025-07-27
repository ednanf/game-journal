import { Request, Response, NextFunction } from 'express';

// Error handler middleware for Express.js
// This middleware catches errors thrown in the application and formats them into a consistent JSON response.
// It sets the HTTP status code based on the error and includes a message in the response body.
// If the error does not have a specific code, it defaults to 500 (Internal Server Error).
const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.code || 500).json({
    status: 'error',
    data: {
      code: err.code,
      message: err.message || 'Internal Server Error',
    },
  });
};

export default errorHandler;

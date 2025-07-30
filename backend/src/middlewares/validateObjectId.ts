import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { BadRequestError } from '../errors/index.js';

// Middleware to validate if a request parameter is a valid MongoDB ObjectId
// This middleware checks if a specified request parameter is a valid MongoDB ObjectId.
// If the parameter is missing or invalid, it calls next with a BadRequestError.
// If the parameter is valid, it calls next() to proceed to the next middleware or route
const validateObjectId =
  (paramName: string) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const id = req.params[paramName];

    if (!id) {
      next(new BadRequestError(`Missing ${paramName}`));
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      next(new BadRequestError(`Invalid ${paramName} format`));
      return;
    }

    next();
  };

export default validateObjectId;

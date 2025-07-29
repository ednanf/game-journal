import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { BadRequestError } from '../errors/index.js';

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

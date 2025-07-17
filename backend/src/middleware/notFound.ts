import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/HttpError.js';

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(404, 'Route not found');
  next(error);
};

export default routeNotFound;
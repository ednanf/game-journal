import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/index.js';

const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = new NotFoundError(`Not Found - ${req.originalUrl}`);
  next(error);
};

export default notFound;

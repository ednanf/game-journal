import { Request, NextFunction } from 'express';
import { UnauthenticatedError } from '../errors/index.js';

const requireUserId = (req: Request, next: NextFunction): string | undefined => {
  const userId = req.user?.userId;
  if (!userId) {
    next(new UnauthenticatedError('User not authenticated. Please log in.'));
    return undefined; // Clean exit, no throw needed
  }
  return userId;
};

export default requireUserId;

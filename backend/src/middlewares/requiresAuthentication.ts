import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError, InternalServerError } from '../errors/index.js';

interface UserPayload extends JwtPayload {
  userId: string;
}

const isUserPayload = (payload: unknown): payload is UserPayload =>
  typeof payload === 'object' &&
  payload !== null &&
  'userId' in payload &&
  typeof (payload as Record<string, unknown>).userId === 'string';

const requiresAuthentication = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new UnauthorizedError('Authentication token is invalid'));
    return;
  }

  const token: string = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not defined in environment variables');
    next(new InternalServerError('Authentication token is invalid'));
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    if (!isUserPayload(payload)) {
      next(new UnauthorizedError('Authentication token is invalid'));
      return;
    }

    // If the token is valid, attach the user information to the request object
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    next(new UnauthorizedError('Authentication token is invalid or expired'));
  }
};

export default requiresAuthentication;

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
    next(
      new UnauthorizedError(
        "Authorization header missing or malformed. Expected format: Bearer 'token'.",
      ),
    );
    return;
  }

  const token: string = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not defined in environment variables');
    next(
      new InternalServerError(
        'Server misconfiguration: JWT_SECRET environment variable is not set.',
      ),
    );
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    if (!isUserPayload(payload)) {
      next(new UnauthorizedError('JWT payload missing required userId. Token structure invalid.'));
      return;
    }

    // Extract userId from the verified JWT payload and attach it to req.user.
    // This is the ONLY way downstream code should access user identity—never trust the client directly.
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    next(
      new UnauthorizedError(
        'JWT verification failed: token is invalid, expired, or tampered with.',
      ),
    );
  }
};

export default requiresAuthentication;

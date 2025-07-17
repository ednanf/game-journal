import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../errors/HttpError.js';

// Define a type for your JWT payload
interface UserPayload extends JwtPayload {
  userId: string;
}

const authentication = async (req: Request, _res: Response, next: NextFunction) => {
  // Check if the request has an Authorization header and obtain it
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new HttpError(StatusCodes.UNAUTHORIZED, 'Authorization header is missing'));
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key and cast the payload
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;

    // Attach the user information to the request object
    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    next(new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid token'));
  }
};

export default authentication;

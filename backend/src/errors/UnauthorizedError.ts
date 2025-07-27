import { StatusCodes } from 'http-status-codes';
import HttpError from './HttpError.js';

class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export default UnauthorizedError;

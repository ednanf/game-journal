import { StatusCodes } from 'http-status-codes';
import HttpError from './HttpError.js';

class ConflictError extends HttpError {
  constructor(message: string) {
    super(StatusCodes.CONFLICT, message);
  }
}

export default ConflictError;

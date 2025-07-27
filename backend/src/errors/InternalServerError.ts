import { StatusCodes } from 'http-status-codes';
import { HttpError } from './index.js';

class InternalServerError extends HttpError {
  constructor(message: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

export default InternalServerError;

import { StatusCodes } from 'http-status-codes';
import HttpError from './HttpError.js';

class NotFound extends HttpError {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export default NotFound;

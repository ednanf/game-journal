import { StatusCodes } from 'http-status-codes';
import HttpError from './HttpError.js';

class BadRequest extends HttpError {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export default BadRequest;

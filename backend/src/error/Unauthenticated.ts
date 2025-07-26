import { StatusCodes } from 'http-status-codes';
import HttpError from './HttpError.js';

class Unauthenticated extends HttpError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export default Unauthenticated;

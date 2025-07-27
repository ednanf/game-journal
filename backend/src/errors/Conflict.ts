import { StatusCodes } from 'http-status-codes';
import HttpError from './HttpError.js';

class Conflict extends HttpError {
  constructor(message: string) {
    super(StatusCodes.CONFLICT, message);
  }
}

export default Conflict;

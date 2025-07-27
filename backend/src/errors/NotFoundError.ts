import { StatusCodes } from 'http-status-codes';
import HttpError from './HttpError.js';

// Custom errors class for Not Found (HTTP 404)
// This class extends HttpError and sets the status code to 404.
class NotFoundError extends HttpError {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export default NotFoundError;

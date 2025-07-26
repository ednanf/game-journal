import { StatusCodes } from 'http-status-codes';
import HttpError from './HttpError.js';

// Custom error class for Unauthenticated (HTTP 401)
// This error is thrown when a user tries to access a resource that requires authentication but is not authenticated.
class Unauthenticated extends HttpError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export default Unauthenticated;

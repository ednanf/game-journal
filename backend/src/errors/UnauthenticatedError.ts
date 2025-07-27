import { StatusCodes } from 'http-status-codes';
import HttpError from './HttpError.js';

// Custom errors class for UnauthenticatedError (HTTP 401)
// This error is thrown when a user tries to access a resource that requires authentication but is not authenticated.
class UnauthenticatedError extends HttpError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export default UnauthenticatedError;

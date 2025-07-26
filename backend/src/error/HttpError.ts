// This class defines a custom HTTP error class that extends the CustomError class.
// It includes an HTTP status code and a message, allowing for more specific error handling in web applications.

import CustomError from './CustomError.js';

class HttpError extends CustomError {
  public readonly code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export default HttpError;

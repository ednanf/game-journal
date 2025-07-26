// This class defines a custom HTTP errors class that extends the CustomError class.
// It includes an HTTP status code and a message, allowing for more specific errors handling in web applications.

import CustomError from './CustomError.js';

// Custom HTTP errors class for handling HTTP errors in web applications.
// It includes an HTTP status code and a message, allowing for more specific errors handling in web applications.
class HttpError extends CustomError {
  public readonly code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export default HttpError;

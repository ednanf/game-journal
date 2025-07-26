// This file defines a custom error class that extends the built-in Error class.
// It allows for creating custom error types with a specific name and stack trace.

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);

    // Maintains proper stack trace for where the was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default CustomError;

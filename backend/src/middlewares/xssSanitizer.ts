// This middleware provides XSS sanitization for incoming request data.
// It replaces express-xss-sanitizer which has a security vulnerability.
// This middleware sanitizes string values in req.body, req.query, and req.params.
import { Request, Response, NextFunction } from 'express';
import xss from 'xss';

// Helper function to recursively sanitize objects
const sanitizeObject = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    return xss(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  if (typeof obj === 'object') {
    const sanitized: any = {};
    Object.keys(obj).forEach((key) => {
      sanitized[key] = sanitizeObject(obj[key]);
    });
    return sanitized;
  }

  return obj;
};

// XSS sanitization middleware
const xssSanitizer = () => (req: Request, _res: Response, next: NextFunction) => {
  try {
    // Sanitize request body
    if (req.body) {
      req.body = sanitizeObject(req.body);
    }

    // Sanitize query parameters
    if (req.query) {
      req.query = sanitizeObject(req.query);
    }

    // Sanitize route parameters
    if (req.params) {
      req.params = sanitizeObject(req.params);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default xssSanitizer;
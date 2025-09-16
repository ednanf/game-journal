// Secure XSS sanitization middleware using sanitize-html
import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';

// Configuration for sanitize-html to strip all HTML tags
// This is more secure than allowing any HTML
const sanitizeOptions = {
  allowedTags: [], // No HTML tags allowed
  allowedAttributes: {}, // No attributes allowed
  disallowedTagsMode: 'discard' as const, // Remove disallowed tags completely
};

/**
 * Recursively sanitizes all string values in an object
 * @param obj - The object to sanitize
 * @returns The sanitized object
 */
function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') {
    return sanitizeHtml(obj, sanitizeOptions);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  
  if (obj !== null && typeof obj === 'object') {
    const sanitized: any = {};
    Object.keys(obj).forEach((key) => {
      sanitized[key] = sanitizeObject(obj[key]);
    });
    return sanitized;
  }
  
  return obj;
}

/**
 * Express middleware to sanitize request body from XSS attacks
 * Replaces the vulnerable express-xss-sanitizer package
 */
const sanitizeInput = () => (req: Request, res: Response, next: NextFunction) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  next();
};

export default sanitizeInput;
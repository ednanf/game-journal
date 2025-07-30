// This middleware validates incoming requests against Zod schemas.
// It ensures that the request body matches the expected structure defined in the schemas.
// If validation fails, it throws a BadRequestError with a detailed message.
// If validation passes, it sanitizes the request body by stripping out any properties not defined in the schema.
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { BadRequestError } from '../errors/index.js';

// Needed to silence TypeScript annoying the hell out of me with ZodIssue being deprecated despite not being true.
type ZIssue = z.ZodError<unknown>['issues'][number];

// This is a higher-order function. It takes a schema and returns a middleware function.
const validate = (schema: z.Schema) => async (req: Request, _res: Response, next: NextFunction) => {
  try {
    // Zod's .parse method validates and throws an error if it fails.
    // It also strips out any properties not defined in the schema.
    // We are replacing req.body with the sanitized, validated data.
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      // If it's a Zod error, we format it nicely and send a 400 response.
      const errorMessages = error.issues.map((issue: ZIssue) => issue.message).join('. ');
      next(new BadRequestError(errorMessages));
    } else {
      // For any other kind of error, pass it down the chain.
      next(error);
    }
  }
};

export default validate;

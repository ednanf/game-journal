// This module defines the schemas for validating user data.
// It uses Zod for schema validation, ensuring that the data conforms to the expected structure.
import { z } from 'zod';

// This defines the shape of the request body for registering a new user.
const registerUserBodySchema = z.object({
  email: z.email({
    message: 'Email must be a string',
  }),
  password: z
    .string({
      message: 'Password must be a string',
    })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

// The loginUserBodySchema is the same as registerUserBodySchema, therefore no need to redefine it.
const loginUserBodySchema = registerUserBodySchema;

export { registerUserBodySchema, loginUserBodySchema };

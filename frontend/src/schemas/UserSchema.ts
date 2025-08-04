import { z } from 'zod';

export const UserSchema = z.object({
  email: z.email('Invalid email address').trim().toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password must be less than 128 characters'),
});

export type User = z.infer<typeof UserSchema>;

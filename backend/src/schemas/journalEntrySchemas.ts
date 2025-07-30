// This module defines the schemas for validating journal entry data.
// It uses Zod for schema validation, ensuring that the data conforms to the expected structure.
import { z } from 'zod';

// This defines the shape of the request body for creating an entry.
const createJournalEntryBodySchema = z.object({
  title: z
    .string({
      error: 'Title must be a string',
    })
    .trim()
    .min(1, { message: 'Title is required and cannot be empty' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),
  platform: z
    .string({
      error: 'Platform must be a string',
    })
    .trim()
    .min(1, { message: 'Platform is required and cannot be empty' }),
  status: z.enum(['started', 'completed', 'dropped']).optional(),
  rating: z.number().min(0).max(10).optional(),
});

// This defines the shape for updating an entry.
// All fields are optional. .strict() ensures no unexpected fields are passed.
const patchJournalEntryBodySchema = createJournalEntryBodySchema.partial().strict();

export { createJournalEntryBodySchema, patchJournalEntryBodySchema };

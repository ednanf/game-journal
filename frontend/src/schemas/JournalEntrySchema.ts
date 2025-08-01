import { z } from 'zod';

export const JournalEntrySchema = z.object({
  title: z
    .string({
      message: 'Title must be a string',
    })
    .trim()
    .min(1, { message: 'Title is required and cannot be empty' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),
  platform: z
    .string({
      message: 'Platform must be a string',
    })
    .trim()
    .min(1, { message: 'Platform is required and cannot be empty' }),
  status: z.enum(['started', 'completed', 'dropped']).optional(),
  rating: z.number().min(0).max(10).optional(),
});

export type JournalEntry = z.infer<typeof JournalEntrySchema>;

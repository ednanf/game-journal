import { z } from 'zod';

// This is the contract for every response
export const EnvelopeSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    message: z.enum(['success', 'error']),
    data: dataSchema,
  });

export type Envelope<T> = {
  message: 'success' | 'error';
  data: T;
};

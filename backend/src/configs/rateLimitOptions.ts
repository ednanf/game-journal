import { Options } from 'express-rate-limit';

const rateLimitOptions: Partial<Options> = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300, // Limit each IP to X requests per windowMs
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
};

export default rateLimitOptions;

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';

import corsOptions from './config/corsOptions.js';
import rateLimitOptions from './config/rateLimitOptions.js';

import authRoutes from './routes/auth.js';
import journalRoutes from './routes/journal.js';

import authentication from './middleware/authentication.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(rateLimit(rateLimitOptions));
app.use(helmet());
app.use(morgan('tiny'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/journal', authentication, journalRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import morgan from 'morgan';

import corsOptions from './configs/corsOptions.js';
import rateLimitOptions from './configs/rateLimitOptions.js';

import authenticate from './middlewares/authenticate.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

import usersRoutes from './routes/usersRoutes.js';
import journalEntriesRoutes from './routes/journalEntriesRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(rateLimit(rateLimitOptions));
app.use(helmet());
app.use(morgan('tiny'));

// Routes
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/journal-entries', authenticate, journalEntriesRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;

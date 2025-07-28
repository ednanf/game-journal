import express from 'express';
import morgan from 'morgan';

import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

import usersRoutes from './routes/usersRoutes.js';
import journalEntriesRoutes from './routes/journalEntriesRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Routes
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/journal-entries', journalEntriesRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;

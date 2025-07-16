import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth.js';
import journalRoutes from './routes/journal.js';

const app = express();

// Middleware

app.use(express.json());
app.use(morgan('tiny'));

// Routes

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/journal', journalRoutes);

export default app;

import express from 'express';

import errorHandler from './middlewares/errorHandler.js';

import userRoutes from './routes/usersRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;

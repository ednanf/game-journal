import express from 'express';
import morgan from 'morgan';

const app = express();

// Middleware

app.use(express.json());
app.use(morgan('tiny'));

// Routes

export default app;

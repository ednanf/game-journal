import http from 'http';

import dbConnect from './utils/dbConnect.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const server = http.createServer(app);

const serverStart = async () => {
  try {
    await dbConnect(MONGO_URI);
    server.listen(PORT, () => {
      console.log(`[system] server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.error('[system] error connecting to MongoDB:', error);
    process.exit(1);
  }
};

serverStart().catch((error) => {
  console.error('[system] error starting server:', error);
  process.exit(1);
});

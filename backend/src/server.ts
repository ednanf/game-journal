import http from 'http';
import app from './app.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const serverStart = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`[system] server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.error('[system] error starting the server:', error);
    process.exit(1);
  }
};

serverStart().catch((error) => {
  console.error('[system] error starting the server:', error);
  process.exit(1);
});

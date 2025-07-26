import http from 'http';
import app from './app.js';
import databaseConnect from './utils/databaseConnect.js';

const { PORT = 3000, MONGODB_URI } = process.env;

const server = http.createServer(app);

const serverStart = async () => {
  try {
    await databaseConnect(MONGODB_URI);
    server.listen(PORT, () => {
      console.log(`[system] server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.error('[system] errors starting the server:', error);
    process.exit(1);
  }
};

serverStart().catch((error) => {
  console.error('[system] errors starting the server:', error);
  process.exit(1);
});

import http from 'http';
import checkEnvVars from './utils/checkEnvVars.js';
import app from './app.js';
import databaseConnect from './utils/databaseConnect.js';

const { PORT = 3000, MONGODB_URI } = process.env;

checkEnvVars(['PORT', 'MONGODB_URI']);

const server: http.Server = http.createServer(app);

const serverStart: () => Promise<void> = async (): Promise<void> => {
  try {
    await databaseConnect(MONGODB_URI);
    server.listen(PORT, (): void => {
      console.log(`[system] server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.error('[system] errors starting the server:', error);
    process.exit(1);
  }
};

serverStart().catch((error: unknown): never => {
  console.error('[system] errors starting the server:', error);
  process.exit(1);
});

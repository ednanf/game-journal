import mongoose from 'mongoose';
import { DatabaseError } from '../error/index.js';

const databaseConnect = async (uri: string | undefined): Promise<void> => {
  if (!uri) {
    throw new DatabaseError(
      '[system] MONGODB_URI is missing. Please set it in your environment variables.',
    );
  }

  try {
    await mongoose.connect(uri);
    console.log('[system] successfully connected to MongoDB...');
  } catch (error) {
    throw new DatabaseError(
      `[system] failed to connect to MongoDB: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

export default databaseConnect;

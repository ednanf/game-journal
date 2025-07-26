import mongoose from 'mongoose';

const databaseConnect = async (uri: string | undefined): Promise<void> => {
  if (!uri) {
    throw new Error(
      '[system] MONGODB_URI is missing. Please set it in your environment variables.',
    );
  }
  await mongoose.connect(uri);
  console.log('[system] successfully connected to MongoDB...');
};

export default databaseConnect;

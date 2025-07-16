import mongoose from 'mongoose';

const dbConnect = async (uri: string | undefined) => {
  if (typeof uri === 'string') {
    await mongoose.connect(uri);
  }
  console.log('[system] connected to MongoDB...');
};

export default dbConnect;

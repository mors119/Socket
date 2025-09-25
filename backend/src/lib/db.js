import mongoose from 'mongoose';
import { ENV } from './env.js';

// DB connect
export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URI) throw new Error('MONGO_URI is not set');

    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log('MONGODB CONNECTED', conn.connection.host);
  } catch (error) {
    console.error('Error connection to MONGODB', error);
    process.exit(1); // 1 status false 0 status success
  }
};

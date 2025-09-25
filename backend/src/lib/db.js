import mongoose from 'mongoose';

// DB connect
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MONGODB CONNECTED', conn.connection.host);
  } catch (error) {
    console.error('Error connection to MONGODB', error);
    process.exit(1); // 1 status false 0 status success
  }
};

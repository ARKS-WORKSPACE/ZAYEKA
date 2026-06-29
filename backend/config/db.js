import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zayeka');
    console.log(`\x1b[36m%s\x1b[0m`, `MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`\x1b[31m%s\x1b[0m`, `Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

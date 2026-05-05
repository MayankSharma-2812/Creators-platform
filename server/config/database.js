import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const isTest = process.env.NODE_ENV === 'test';
    const mongoURI = isTest 
      ? (process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/creators-platform-test')
      : (process.env.MONGODB_URI || 'mongodb://localhost:27017/creators-platform');

    // Try to connect to MongoDB
    await mongoose.connect(mongoURI);

    if (!isTest) {
      console.log('✅ MongoDB connected successfully');
    }

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    if (process.env.NODE_ENV !== 'test') {
      console.log('🔄 Continuing without database for development...');
    }
  }
};

export default connectDB;

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

async function testMongoConnection() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connection successful');
    await mongoose.disconnect();
  } catch (error: any) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
}

testMongoConnection();

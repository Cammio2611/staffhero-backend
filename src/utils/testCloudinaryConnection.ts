import dotenv from 'dotenv';
dotenv.config();

import cloudinary from './cloudinary';

async function testCloudinary() {
  try {
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful:', result);
  } catch (error: any) {
    console.error('❌ Cloudinary connection failed:', error.message);
  }
}

testCloudinary();

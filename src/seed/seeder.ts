import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { shiftsSeeder } from './shiftsSeeder'; // ✅ correct import

dotenv.config();

const seedDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Run only shiftsSeeder for now
    await shiftsSeeder();

    console.log('✅ Seeding completed!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

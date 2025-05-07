// src/seed/usersSeeder.ts
import bcrypt from 'bcryptjs';
import User from '../models/User';

const usersSeeder = async () => {
  try {
    await User.deleteMany(); // Clear old users (optional)

    const salt = await bcrypt.genSalt(10);

    const users = [
      {
        name: 'Admin User',
        email: 'admin@staffhero.com',
        password: await bcrypt.hash('password123', salt),
        role: 'admin',
        isCompliant: true,
        sectors: ['Healthcare', 'Education'],
      },
      {
        name: 'Healthcare Worker 1',
        email: 'worker1@staffhero.com',
        password: await bcrypt.hash('password123', salt),
        role: 'candidate',
        isCompliant: true,
        sectors: ['Healthcare'],
      },
      {
        name: 'Education Worker 1',
        email: 'worker2@staffhero.com',
        password: await bcrypt.hash('password123', salt),
        role: 'candidate',
        isCompliant: false,
        sectors: ['Education'],
      },
      {
        name: 'Client User',
        email: 'client@staffhero.com',
        password: await bcrypt.hash('password123', salt),
        role: 'client',
        isCompliant: true,
        sectors: ['Healthcare', 'SEN'],
      },
    ];

    await User.insertMany(users);

    console.log('✅ Users seeded successfully.');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
};

export default usersSeeder;

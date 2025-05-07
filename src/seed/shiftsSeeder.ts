import Shift from '../models/Shift';

export const shiftsSeeder = async () => {
  try {
    const sampleShifts = [
      {
        clientName: 'Care Home A',
        role: 'Healthcare Assistant',
        location: 'London',
        date: new Date('2025-05-05'),
        startTime: '08:00',
        endTime: '14:00',
        hourlyRate: 15,
      },
      {
        clientName: 'School B',
        role: 'Teaching Assistant',
        location: 'Manchester',
        date: new Date('2025-05-06'),
        startTime: '09:00',
        endTime: '15:30',
        hourlyRate: 14,
      },
    ];

    await Shift.insertMany(sampleShifts);
    console.log('✅ Shifts seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding shifts:', error);
  }
};

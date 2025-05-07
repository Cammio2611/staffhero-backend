import mongoose from 'mongoose';

const onboardingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  stepsCompleted: { type: [String], default: [] },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

const Onboarding = mongoose.model('Onboarding', onboardingSchema);

export default Onboarding;

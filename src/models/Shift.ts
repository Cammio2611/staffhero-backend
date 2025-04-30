// src/models/Shift.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IShift extends Document {
  clientName: string;
  role: string;
  location: string;
  date: Date;
  startTime: string;
  endTime: string;
  hourlyRate: number;
  assignedWorkerId?: mongoose.Types.ObjectId; // ✅ ADD THIS
  bookedBy?: mongoose.Types.ObjectId;
  status: 'open' | 'booked' | 'completed' | 'cancelled';
  notes?: string;
  expenses?: number;
}

const ShiftSchema = new Schema<IShift>({
  clientName: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  assignedWorkerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  status: { type: String, enum: ['open', 'booked', 'completed', 'cancelled'], default: 'open' },
  notes: { type: String },
  expenses: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Shift = mongoose.model<IShift>('Shift', ShiftSchema);

export default Shift;

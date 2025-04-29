import mongoose, { Schema, Document } from 'mongoose';

export interface ICompliance extends Document {
  userId: mongoose.Types.ObjectId;
  name: string; // e.g., "DBS Check", "First Aid Certificate"
  fileUrl?: string; // optional link to uploaded file
  expiryDate: Date;
  status: 'compliant' | 'expiring' | 'expired' | 'missing';
}

const ComplianceSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String
    },
    expiryDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['compliant', 'expiring', 'expired', 'missing'],
      default: 'compliant'
    }
  },
  { timestamps: true }
);

const Compliance = mongoose.model<ICompliance>('Compliance', ComplianceSchema);
export default Compliance;

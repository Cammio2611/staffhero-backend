import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "client" | "candidate";
  isCompliant: boolean;
  profilePhoto?: string;
  sectors: string[];
  availability: string[];
  ratings: { clientId: mongoose.Types.ObjectId; rating: number }[];
  favoriteClients: mongoose.Types.ObjectId[];
  requiredDocuments: {
    name: string;
    mandatory: boolean;
    uploaded: boolean;
    verified: boolean;
    fileUrl?: string;
    uploadDate?: Date;
    expiryDate?: Date;
  }[];
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "client", "candidate"], default: "candidate" },
    isCompliant: { type: Boolean, default: false },
    profilePhoto: { type: String },
    sectors: { type: [String], default: [] },
    availability: { type: [String], default: [] },
    ratings: [
      {
        clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    favoriteClients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    requiredDocuments: [
      {
        name: { type: String, required: true },
        mandatory: { type: Boolean, default: true },
        uploaded: { type: Boolean, default: false },
        verified: { type: Boolean, default: false },
        fileUrl: { type: String },
        uploadDate: { type: Date },
        expiryDate: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;

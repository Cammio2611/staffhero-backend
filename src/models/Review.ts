import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  reviewer: string;
  comment: string;
  rating: number;
}

const ReviewSchema = new Schema<IReview>({
  reviewer: String,
  comment: String,
  rating: Number
});

const Review = mongoose.model<IReview>('Review', ReviewSchema);
export default Review;
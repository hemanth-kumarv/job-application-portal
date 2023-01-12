import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IJobSchema {
  title?: string;
  description?: string;
  userId?: string;
  skills?: string[];
  experience?: number;
  isDeleted?: boolean;
}

export const JobSchema = new Schema<IJobSchema>(
  {
    title: String,
    description: String,
    userId: mongoose.Types.ObjectId,
    skills: [String],
    experience: Number,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

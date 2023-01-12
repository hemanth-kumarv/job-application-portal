import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IJobApplicationsSchema {
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  coverLetter: string;
  isDeleted?: boolean;
}

export const JobApplicationsSchema = new Schema<IJobApplicationsSchema>(
  {
    jobId: mongoose.Types.ObjectId,
    applicantName: String,
    applicantEmail: String,
    coverLetter: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

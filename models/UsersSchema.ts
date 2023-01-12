import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IUsersSchema {
  name?: string;
  email?: string;
  password?: string;
  userId?: string;
  isDeleted?: boolean;
}

export const UsersSchema = new Schema<IUsersSchema>(
  {
    name: String,
    email: String,
    password: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

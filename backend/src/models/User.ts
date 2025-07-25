import { Schema, model, Document } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  createdAt?: string; //  Added automatically
  updatedAt?: string; //  Added automatically
}

export interface IUserDocument extends IUser, Document {
  _id: string; // Added automatically
  __v: number; // Version key for Mongoose documents
}

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [5, 'Email must be at least 5 characters long'],
      match: [/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long'],
    },
  },
  { timestamps: true },
);

export const User = model<IUserDocument>('User', userSchema);

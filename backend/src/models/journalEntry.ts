import { Schema, model, Document, Types } from 'mongoose';

export interface IJournalEntry extends Document {
  createdBy: Types.ObjectId;
  title: string;
  platform: string;
  status: 'started' | 'completed' | 'dropped';
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const journalEntrySchema = new Schema<IJournalEntry>(
  {
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    platform: {
      type: String,
      required: [true, 'Platform is required'],
      trim: true,
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['started', 'completed', 'dropped'],
      default: 'started',
    },
    rating: {
      type: Number,
      min: [0, 'Rating cannot be less than 0'],
      max: [10, 'Rating cannot exceed 10'],
      default: 5,
    },
  },
  { timestamps: true },
);

export const JournalEntry = model<IJournalEntry>('JournalEntry', journalEntrySchema);

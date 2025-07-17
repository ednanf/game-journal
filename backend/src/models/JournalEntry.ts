import { Schema, model, Document, Types } from 'mongoose';

export interface IJournalEntry extends Document {
  createdBy: Types.ObjectId;
  gameTitle: string;
  platform: string;
  status: 'started' | 'completed' | 'dropped' | 'note';
  coverUrl?: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const journalEntrySchema = new Schema<IJournalEntry>({
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  gameTitle: { type: String, required: [true, "Please, provide a title"], maxlength: 100 },
  platform: { type: String, required: [true, "Please, provide a platform"], maxlength: 50 },
  status: {
    type: String,
    required: true,
    enum: ['started', 'completed', 'dropped', 'note'],
  },
  coverUrl: { type: String },
  rating: { type: Number, min: 0, max: 10, default: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<IJournalEntry>('JournalEntry', journalEntrySchema);

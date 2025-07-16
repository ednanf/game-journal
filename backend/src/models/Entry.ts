import { Schema, model, Document, Types } from 'mongoose';

export interface IEntry extends Document {
  user: Types.ObjectId;
  gameName: string;
  platform: string;
  status: 'started' | 'completed' | 'dropped' | 'note';
  coverUrl?: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const entrySchema = new Schema<IEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  gameName: { type: String, required: true, maxlength: 100 },
  platform: { type: String, required: true, maxlength: 50 },
  status: {
    type: String,
    required: true,
    enum: ['started', 'completed', 'dropped', 'note'],
  },
  coverUrl: { type: String },
  rating: { type: Number, min: 0, max: 10 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<IEntry>('Entry', entrySchema);

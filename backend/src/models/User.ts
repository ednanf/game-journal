import { Schema, model, Document } from 'mongoose';
import hashPassword from '../utils/hashPassword.js';
import createToken from '../utils/jwt.js';
import comparePasswords from '../utils/comparePasswords.js';

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to hash the password before saving the user
userSchema.pre('save', async function () {
  this.passwordHash = await hashPassword(this.passwordHash);
});

// Add a method to the user schema to create a JWT
userSchema.methods.createJWT = function () {
  return createToken({ userId: this._id, username: this.name });
};

// Add a method to the user schema to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return comparePasswords(candidatePassword, this.passwordHash);
};

export default model<IUser>('User', userSchema);

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

  createJWT(): string;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'A username is required'],
    unique: [true, 'Username already exists'],
    minLength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
    unique: [true, 'An account with this email already exists'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please, provide a valid email address.',
    ],
    maxlength: 100,
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 6,
    maxlength: 255,
  },
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

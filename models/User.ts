import mongoose, { Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);
export default User;

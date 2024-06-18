import { Schema, Document } from 'mongoose';

export const UserSchema: Schema = new Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  createdDate: { default: Date.now, type: Date },
  updatedDate: { default: Date.now, type: Date },
  lastLoginDate: { type: Date, default: null },
  deletedDate: { type: Date, default: null },
});

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  createdDate: Date;
  updatedDate: Date;
  lastLoginDate: Date;
  deletedDate: Date;
}

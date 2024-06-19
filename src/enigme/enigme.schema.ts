import { Schema, Document } from 'mongoose';

export const EnigmeSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // id du createur
  createdDate: { default: Date.now, type: Date },
  updatedDate: { default: Date.now, type: Date },
  deletedDate: { type: Date, default: null },
});

export interface Enigme extends Document {
  id: string;
  title: string;
  slug: string;
  owner: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
}

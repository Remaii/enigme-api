import { Schema, Document } from 'mongoose';

export const RevealSchema: Schema = new Schema({
  enigme: { type: Schema.Types.ObjectId, ref: 'Enigme', required: true },
  message: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: { default: Date.now, type: Date },
  updatedDate: { default: Date.now, type: Date },
  deletedDate: { type: Date, default: null },
});

export interface Reveal extends Document {
  id: string;
  enigme: string;
  message: string;
  owner: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
}

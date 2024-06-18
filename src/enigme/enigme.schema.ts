import { Schema, Document } from 'mongoose';

export const EnigmeSchema: Schema = new Schema({
  enigme: { type: String, required: true },
  order: { type: Number, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true }, // TODO : need to be defined
  createdDate: { default: Date.now, type: Date },
  updatedDate: { default: Date.now, type: Date },
  deletedDate: { type: Date, default: null },
});

export interface Enigme extends Document {
  id: string;
  enigme: string;
  order: number;
  question: string;
  answer: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
}

import { Schema, Document } from 'mongoose';

export const ActivitySchema: Schema = new Schema({
  enigme: { type: Schema.Types.ObjectId, ref: 'Enigme', required: true },
  order: { type: Number, required: true }, // order of activity
  activity: { type: String, required: true }, // TODO : enum: []
  message: { type: String, required: true },
  win: { type: Number, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: { default: Date.now, type: Date },
  updatedDate: { default: Date.now, type: Date },
  deletedDate: { type: Date, default: null },
});

export interface Activity extends Document {
  id: string;
  enigme: string;
  order: number;
  activity: string;
  message: string;
  win: number;
  owner: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
}

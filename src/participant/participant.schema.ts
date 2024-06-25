import { Schema, Document } from 'mongoose';

export const ParticipantSchema: Schema = new Schema({
  enigme: { type: Schema.Types.ObjectId, ref: 'Enigme', required: true },
  name: { type: String, required: true },
  step: { type: String, required: true },
  createdDate: { default: Date.now, type: Date },
  updatedDate: { default: Date.now, type: Date },
  deletedDate: { type: Date, default: null },
});

export interface Participant extends Document {
  id: string;
  enigme: string;
  name: string;
  step: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
}

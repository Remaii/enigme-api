import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Participant } from './participant.schema';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel('Participant')
    private readonly participantModel: Model<Participant>,
  ) {}

  async create(activityDto: any): Promise<Participant> {
    try {
      const { enigme, name, step } = activityDto;
      const newParticipant = new this.participantModel({
        enigme,
        name,
        step,
      });
      return await newParticipant.save();
    } catch (error) {
      throw error;
    }
  }

  async getParticipationByEnigme(enigmeId: string): Promise<Participant[]> {
    return await this.participantModel
      .find({ enigme: enigmeId, deletedDate: null })
      .exec();
  }

  async updateParticipant(
    participantId: string,
    participantDto: any,
  ): Promise<Participant> {
    const { step } = participantDto;
    const updatedParticipant = await this.participantModel.findByIdAndUpdate(
      participantId,
      { step, updatedDate: new Date() },
      { new: true },
    );
    if (!updatedParticipant) {
      throw new NotFoundException('Participant not found');
    }
    return updatedParticipant;
  }
}

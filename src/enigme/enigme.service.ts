import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enigme } from './enigme.schema';

@Injectable()
export class EnigmeService {
  constructor(
    @InjectModel('Enigme') private readonly enigmeModel: Model<Enigme>,
  ) {}

  async create(createEnigmeDto: any): Promise<Enigme> {
    try {
      const { enigme, question, answer, order } = createEnigmeDto;
      const newEnigme = new this.enigmeModel({
        enigme,
        question,
        answer,
        order,
      });
      return await newEnigme.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllEnigmes(enigme: string): Promise<Enigme[]> {
    return await this.enigmeModel.find({ enigme }).exec();
  }

  async getOneEnigme(enigme: string, order: number): Promise<Enigme> {
    return await this.enigmeModel.findOne({ enigme, order }).exec();
  }

  async updateEnigme(enigmeId: string, enigmeDto: any): Promise<Enigme> {
    const { enigme, question, answer, order } = enigmeDto;
    const updatedEnigme = await this.enigmeModel.findById(
      enigmeId,
      { enigme, question, answer, order },
      { new: true },
    );
    if (!updatedEnigme) {
      throw new NotFoundException('Enigme not found');
    }
    return updatedEnigme;
  }

  async deleteEnigme(enigmeId: string): Promise<void> {
    const result = await this.enigmeModel.findByIdAndUpdate(
      enigmeId,
      { deletedDate: new Date() },
      { new: true },
    );
    if (!result) {
      throw new NotFoundException('Enigme not found');
    }
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reveal } from './reveal.schema';
import { User } from '../user/user.schema';

@Injectable()
export class RevealService {
  constructor(
    @InjectModel('Reveal') private readonly revealModel: Model<Reveal>,
  ) {}

  async create(revealDto: any, requestingUser: User): Promise<Reveal> {
    try {
      const { enigme, message } = revealDto;
      const newReveal = new this.revealModel({
        enigme,
        message,
        owner: requestingUser.id,
      });
      return await newReveal.save();
    } catch (error) {
      throw error;
    }
  }

  async getReveal(revealId: string): Promise<Reveal> {
    return await this.revealModel.findById(revealId).exec();
  }

  async getRevealByEnigme(enigmeId: string): Promise<Reveal> {
    return await this.revealModel
      .findOne({ enigme: enigmeId, deletedDate: null })
      .exec();
  }

  async updateReveal(
    revealId: string,
    revealDto: any,
    requestingUser: User,
  ): Promise<Reveal> {
    const original = await this.revealModel
      .findById(revealId)
      .select('+owner')
      .exec();
    if (
      original.owner.toString() !== requestingUser.id &&
      !requestingUser.admin
    ) {
      throw new ForbiddenException('Access denied, Admin privilege require');
    }
    const { message } = revealDto;
    const updatedReveal = await this.revealModel.findByIdAndUpdate(
      revealId,
      { message, updatedDate: new Date() },
      { new: true },
    );
    if (!updatedReveal) {
      throw new NotFoundException('Reveal not found');
    }
    return updatedReveal;
  }

  async deleteReveal(revealId: string, requestingUser: User): Promise<void> {
    const original = await this.revealModel
      .findById(revealId)
      .select('+owner')
      .exec();
    if (
      original.owner.toString() !== requestingUser.id &&
      !requestingUser.admin
    ) {
      throw new ForbiddenException('Access denied, Admin privilege require');
    }
    const result = await this.revealModel.findByIdAndUpdate(
      revealId,
      { deletedDate: new Date() },
      { new: true },
    );
    if (!result) {
      throw new NotFoundException('Reveal not found');
    }
  }
}

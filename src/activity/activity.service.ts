import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from './activity.schema';
import { User } from '../user/user.schema';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel('Activity') private readonly activityModel: Model<Activity>,
  ) {}

  async create(activityDto: any, requestingUser: User): Promise<Activity> {
    try {
      const { enigme, activity } = activityDto;
      const count = await this.activityModel
        .find({ enigme, deletedDate: null })
        .countDocuments();
      const newActivity = new this.activityModel({
        enigme,
        activity,
        order: count + 1,
        owner: requestingUser.id,
      });
      return await newActivity.save();
    } catch (error) {
      throw error;
    }
  }

  async getActivity(activityId: string): Promise<Activity> {
    return await this.activityModel.findById(activityId).exec();
  }

  async getActivityByEnigme(enigmeId: string): Promise<Activity[]> {
    return await this.activityModel
      .find({ enigme: enigmeId, deletedDate: null })
      .sort({ order: 1 })
      .exec();
  }

  async updateActivity(
    activityId: string,
    activityDto: any,
    requestingUser: User,
  ): Promise<Activity> {
    const original = await this.activityModel
      .findById(activityId)
      .select('+owner')
      .exec();
    if (
      original.owner.toString() !== requestingUser.id &&
      !requestingUser.admin
    ) {
      throw new ForbiddenException('Access denied, Admin privilege require');
    }
    const { activity, order } = activityDto;
    const updatedActivity = await this.activityModel.findByIdAndUpdate(
      activityId,
      { activity, order, updatedDate: new Date() },
      { new: true },
    );
    if (!updatedActivity) {
      throw new NotFoundException('Activity not found');
    }
    return updatedActivity;
  }

  async deleteActivity(
    activityId: string,
    requestingUser: User,
  ): Promise<void> {
    const original = await this.activityModel
      .findById(activityId)
      .select('+owner')
      .exec();
    if (
      original.owner.toString() !== requestingUser.id &&
      !requestingUser.admin
    ) {
      throw new ForbiddenException('Access denied, Admin privilege require');
    }
    const result = await this.activityModel.findByIdAndUpdate(
      activityId,
      { deletedDate: new Date() },
      { new: true },
    );
    if (!result) {
      throw new NotFoundException('Activity not found');
    }
  }
}

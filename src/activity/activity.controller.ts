import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('api/activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async createActivity(
    @Body('enigme') enigme: string,
    @Body('activity') activity: string,
    @Body('message') message: string,
    @Body('win') win: string,
    @Req() request: any,
  ) {
    return await this.activityService.create(
      {
        enigme,
        activity,
        message,
        win,
      },
      request.user,
    );
  }

  @Get(':activity_id')
  async getActivity(@Param('activity_id') activityId: string) {
    return await this.activityService.getActivity(activityId);
  }

  @Get('enigme/:enigme_id')
  async getActivityByEnigme(@Param('enigme_id') enigmeId: string) {
    return await this.activityService.getActivityByEnigme(enigmeId);
  }

  @Patch(':activity_id')
  async updateActivity(
    @Param('activity_id') activityId: string,
    @Body('activity') activity: string,
    @Body('message') message: string,
    @Body('order') order: number,
    @Body('win') win: number,
    @Req() request: any,
  ) {
    return await this.activityService.updateActivity(
      activityId,
      {
        activity,
        message,
        order,
        win,
      },
      request.user,
    );
  }

  @Delete(':activity_id')
  async removeActivity(
    @Param('activity_id') activityId: string,
    @Req() request: any,
  ) {
    await this.activityService.deleteActivity(activityId, request.user);
    return null;
  }
}

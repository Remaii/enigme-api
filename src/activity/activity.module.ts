import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { ActivitySchema } from './activity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Activity', schema: ActivitySchema }]),
  ],
  providers: [ActivityService],
  controllers: [ActivityController],
  exports: [ActivityService],
})
export class ActivityModule {}

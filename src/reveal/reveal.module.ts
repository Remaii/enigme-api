import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RevealService } from './reveal.service';
import { RevealController } from './reveal.controller';
import { RevealSchema } from './reveal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reveal', schema: RevealSchema }]),
  ],
  providers: [RevealService],
  controllers: [RevealController],
  exports: [RevealService],
})
export class RevealModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnigmeService } from './enigme.service';
import { EnigmeController } from './enigme.controller';
import { EnigmeSchema } from './enigme.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Enigme', schema: EnigmeSchema }]),
  ],
  providers: [EnigmeService],
  controllers: [EnigmeController],
  exports: [EnigmeService],
})
export class EnigmeModule {}

import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EnigmeService } from './enigme.service';

@Controller('question')
export class EnigmeController {
  constructor(private readonly enigmeService: EnigmeService) {}

  @Post()
  async addQuestion() {
    return await this.enigmeService.create({});
  }

  @Get(':enigme')
  async getQuestions(@Param('enigme') enigme: string) {
    return await this.enigmeService.getAllEnigmes(enigme);
  }

  @Get(':enigme/:order')
  async getOneQuestion(
    @Param('enigme') enigme: string,
    @Param('order') order: number,
  ) {
    return await this.enigmeService.getOneEnigme(enigme, order);
  }

  @Patch(':enigme_id')
  async updateQuestion(
    @Param('enigme_id') enigmeId: string,
    @Body('enigme') enigme: string,
    @Body('question') question: string,
    @Body('answer') answer: string,
    @Body('order') order: number,
  ) {
    return await this.enigmeService.updateEnigme(enigmeId, {
      enigme,
      question,
      answer,
      order,
    });
  }

  @Delete(':enigme_id')
  async removeEnigme(@Param('enigme_id') enigmeId: string) {
    await this.enigmeService.deleteEnigme(enigmeId);
    return null;
  }
}

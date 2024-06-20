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
import { RevealService } from './reveal.service';

@Controller('api/reveal')
export class RevealController {
  constructor(private readonly revealService: RevealService) {}

  @Post()
  async createReveal(
    @Body('enigme') enigme: string,
    @Body('message') message: string,
    @Req() request: any,
  ) {
    return await this.revealService.create(
      {
        enigme,
        message,
      },
      request.user,
    );
  }

  @Get(':reveal_id')
  async getReveal(@Param('reveal_id') revealId: string) {
    return await this.revealService.getReveal(revealId);
  }

  @Get('enigme/:enigme_id')
  async getRevealByEnigme(@Param('enigme_id') enigmeId: string) {
    return await this.revealService.getRevealByEnigme(enigmeId);
  }

  @Patch(':reveal_id')
  async updateReveal(
    @Param('reveal_id') revealId: string,
    @Body('activity') activity: string,
    @Body('order') order: number,
    @Req() request: any,
  ) {
    return await this.revealService.updateReveal(
      revealId,
      {
        order,
      },
      request.user,
    );
  }

  @Delete(':reveal_id')
  async remoReveal(@Param('reveal_id') revealId: string, @Req() request: any) {
    await this.revealService.deleteReveal(revealId, request.user);
    return null;
  }
}

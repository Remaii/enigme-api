import { Controller, Post, Patch, Param, Body, Get } from '@nestjs/common';
import { ParticipantService } from './participant.service';

@Controller('api/participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  async createActivity(
    @Body('enigme') enigme: string,
    @Body('name') name: string,
    @Body('step') step: string,
  ) {
    return await this.participantService.create({
      enigme,
      name,
      step,
    });
  }

  @Get(':enigme_id')
  async getActivityByEnigme(@Param('enigme_id') enigmeId: string) {
    return await this.participantService.getParticipationByEnigme(enigmeId);
  }

  @Patch(':participant_id')
  async updateActivity(
    @Param('participant_id') participantId: string,
    @Body('enigme') enigme: string,
    @Body('name') name: string,
    @Body('step') step: string,
  ) {
    return await this.participantService.updateParticipant(participantId, {
      enigme,
      name,
      step,
    });
  }
}

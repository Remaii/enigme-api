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
import { EnigmeService } from './enigme.service';
import { Enigme } from './enigme.schema';

@Controller('api/enigmes')
export class EnigmeController {
  constructor(private readonly enigmeService: EnigmeService) {}

  @Post()
  async createEnigme(@Body('title') title: string, @Req() request: any) {
    const requestingUser = request.user;
    return await this.enigmeService.create(
      {
        title,
      },
      requestingUser,
    );
  }

  @Get()
  async getEnigmes(@Req() request: any): Promise<Enigme[]> {
    return await this.enigmeService.getAllEnigmes(request.user);
  }

  @Get(':slug')
  async getEnigme(@Param('slug') slug: string) {
    return await this.enigmeService.getEnigmes(slug);
  }

  @Patch(':enigme_id')
  async updateEnigme(
    @Param('enigme_id') enigmeId: string,
    @Body('title') title: string,
    @Body('updateSlug') updateSlug: boolean,
    @Req() request: any,
  ) {
    const requestingUser = request.user;
    return await this.enigmeService.updateEnigme(
      enigmeId,
      {
        title,
        updateSlug,
      },
      requestingUser,
    );
  }

  @Delete(':enigme_id')
  async removeEnigme(
    @Param('enigme_id') enigmeId: string,
    @Req() request: any,
  ) {
    await this.enigmeService.deleteEnigme(enigmeId, request.user);
    return null;
  }
}

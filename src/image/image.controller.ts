import { Controller, Post, Body } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('api/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('add-text-from-url')
  async addTextToImageFromUrl(
    @Body()
    body: {
      imageUrl: string;
      text: string;
      screenWidth: number;
      screenHeight: number;
    },
  ) {
    const { imageUrl, text, screenWidth, screenHeight } = body;
    const result = await this.imageService.addTextToImageFromUrl(
      imageUrl,
      text,
      screenWidth,
      screenHeight,
    );
    return { image: result };
  }
}

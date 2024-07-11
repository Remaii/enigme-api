import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import Vibrant = require('node-vibrant');
import * as chroma from 'chroma-js';

@Injectable()
export class ImageService {
  constructor() {}

  calculateFontSize(screenWidth: number) {
    let baseFontSize;

    if (screenWidth < 600) {
      baseFontSize = 30; // petits écrans
    } else if (screenWidth < 1024) {
      baseFontSize = 36; // écrans de taille moyenne
    } else { // grands écrans
      baseFontSize = 40;
    }

    return baseFontSize;
  }

  async calculateDominantColor(data: any) {
    const buffer = Buffer.from(data, 'binary');

    const palette = await Vibrant.from(buffer).getPalette();

    const dominantColors = [
      palette.Vibrant.getHex(),
      palette.LightVibrant.getHex(),
      palette.DarkVibrant.getHex(),
      // Ajoutez d'autres couleurs si nécessaire (Muted, etc.)
    ];

    return dominantColors.filter((color) => color);
  }

  chooseContrastingColor(colors: string[]): string | null {
    const targetLuminance = 0.5;
    const targetSaturation = 0.75;

    let bestColor = null;
    let bestContrast = -Infinity;

    colors.forEach((color) => {
      const chromaColor = chroma(color);
      const luminance = chromaColor.luminance();
      const saturation = chromaColor.saturate().get('hsl.s');
      const contrast = Math.abs(luminance - targetLuminance) + Math.abs(saturation - targetSaturation);
      if (contrast > bestContrast) {
        bestContrast = contrast;
        bestColor = color;
      }
    });

    return bestColor;
  }

  async addTextToImageFromUrl(imageUrl: string, text: string, screenWidth: number, screenHeight: number): Promise<string> {
    try {
      // Télécharger l'image à partir de l'URL en utilisant fetch
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch the image.');
      }
      const arrayBuffer = await response.arrayBuffer();
      const dominantColors = await this.calculateDominantColor(arrayBuffer);
      const textColor = this.chooseContrastingColor(dominantColors);
      const buffer = Buffer.from(arrayBuffer);
      const metadata = await sharp(buffer).metadata();
      const image = sharp(buffer);
      const { width, height } = metadata;

      const svgText = `<svg width="${screenWidth}" height="${screenHeight}">
        <text x="50%" y="50%" font-family="Arial" font-size="${this.calculateFontSize(screenWidth)}" fill="${textColor}" text-anchor="middle">${text}</text>
      </svg>`;

      const textImage = sharp(Buffer.from(svgText))
        .png()
        .resize(width, height);

      const textBuffer = await textImage.toBuffer();
      const combinedImage = await image.composite([{ input: textBuffer }]).toBuffer();
      const base64Image = combinedImage.toString('base64');
      return `data:image/png;base64,${base64Image}`;
    } catch (error) {
      console.error('Error processing image:', error);
      throw new Error('Failed to process the image.');
    }
  }
}

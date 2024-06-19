import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enigme } from './enigme.schema';
import { User } from '../user/user.schema';
import { SlugService } from './slug.service';

@Injectable()
export class EnigmeService {
  constructor(
    @InjectModel('Enigme') private readonly enigmeModel: Model<Enigme>,
  ) {}

  async create(createEnigmeDto: any, owner: User): Promise<Enigme> {
    try {
      const { title } = createEnigmeDto;
      const slug = SlugService.generateSlug(title);

      const newEnigme = new this.enigmeModel({
        title,
        slug,
        owner: owner.id,
      });
      return await newEnigme.save();
    } catch (error) {
      if (error.code === 11000 || error.code === 11001) {
        throw new ConflictException('Title already exists');
      }
      throw error;
    }
  }

  async getEnigmes(slug: string): Promise<Enigme> {
    return await this.enigmeModel.findOne({ slug }).exec();
  }

  async updateEnigme(
    enigmeId: string,
    enigmeDto: any,
    user: User,
  ): Promise<Enigme> {
    const data = await this.enigmeModel.findById(enigmeId).exec();
    if (data.owner.toString() !== user.id && !user.admin) {
      throw new ForbiddenException('Access denied, Admin privilege require');
    }
    try {
      const { title, updateSlug } = enigmeDto;
      const update = {
        title: title,
        slug: SlugService.generateSlug(title),
        updatedDate: new Date(),
      };
      if (!updateSlug) {
        delete update.slug;
      }
      return await this.enigmeModel.findByIdAndUpdate(enigmeId, update, {
        new: true,
      });
    } catch (error) {
      if (error.code === 11000 || error.code === 11001) {
        throw new ConflictException('Title already exists');
      }
      throw error;
    }
  }

  async deleteEnigme(enigmeId: string, requestingUser: User): Promise<void> {
    const data = await this.enigmeModel.findById(enigmeId).exec();
    if (data.owner.toString() !== requestingUser.id && !requestingUser.admin) {
      throw new ForbiddenException('Access denied, Admin privilege require');
    }
    const result = await this.enigmeModel.findByIdAndUpdate(
      enigmeId,
      { slug: 'DELETED_' + data.slug, deletedDate: new Date() },
      { new: true },
    );
    if (!result) {
      throw new NotFoundException('Enigme not found');
    }
  }
}

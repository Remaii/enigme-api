import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: any): Promise<User> {
    try {
      const { email, password, name } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
      });
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000 || error.code === 11001) {
        throw new ConflictException('Email / Enigme already exists');
      }
      throw error;
    }
  }

  async getUsers(requestingUser: User): Promise<User[]> {
    if (!requestingUser.admin) {
      throw new ForbiddenException('Access denied, Admin privilege require');
    }
    return await this.userModel.find().exec();
  }

  async getUser(userId: string, requestingUser: User): Promise<User> {
    if (requestingUser.id !== userId && !requestingUser.admin) {
      throw new ForbiddenException('Access denied');
    }
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .exec();
    if (!user || !!user.deletedDate) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email }).exec();
  }

  async updateUser(userId: string, userDto: any): Promise<User> {
    const { name, email, password } = userDto;
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const result = await this.userModel.findByIdAndUpdate(
      userId,
      { deletedDate: Date.now() },
      { new: true },
    );
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}

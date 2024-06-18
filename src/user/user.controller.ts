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
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.userService
      .create({ name, email, password })
      .then((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user.toObject();
        return result;
      });
  }

  @Get()
  async getAllUsers(@Req() request: any) {
    const requestingUser = request.user;
    return await this.userService.getUsers(requestingUser);
  }

  @Get(':id')
  async getUser(@Param('id') userId: string, @Req() request: any) {
    const requestingUser = request.user;
    return await this.userService.getUser(userId, requestingUser);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.userService.updateUser(userId, {
      name,
      email,
      password,
    });
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.userService.deleteUser(userId);
    return null;
  }
}

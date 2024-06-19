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
  async createUser(
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
    return await this.userService.getUsers(request.user);
  }

  @Get('me')
  async getMe(@Req() request: any) {
    return await this.userService.getMyUser(request.user);
  }

  @Get(':id')
  async getUser(@Param('id') userId: string, @Req() request: any) {
    return await this.userService.getUser(userId, request.user);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Req() request: any,
  ) {
    return await this.userService.updateUser(
      userId,
      {
        name,
        email,
        password,
      },
      request.user,
    );
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string, @Req() request: any) {
    await this.userService.deleteUser(userId, request.user);
    return null;
  }
}

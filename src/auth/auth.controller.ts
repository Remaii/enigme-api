import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const jwt = await this.authService.login(user);
    response.cookie('jwt', jwt.access_token, { maxAge: 7 * 24 * 60 * 3600 });
    return { message: 'Login successful' };
  }
}

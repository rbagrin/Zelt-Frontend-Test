import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  async register(
    @Body('name') name: string,
    @Body('password') password: string,
  ): Promise<void> {
    return this.appService.register(name, password);
  }

  @Post('/login')
  async login(
    @Body('name') name: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const token = await this.appService.login(name, password);

    response.cookie('token', token, { httpOnly: true });
    return 'Success';
  }

  @Post('/logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    response.clearCookie('token');
    return 'Success';
  }

  @Get('/hello-world')
  helloWorld(): string {
    return 'Hello World!';
  }
}

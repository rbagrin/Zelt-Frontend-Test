import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUser } from './user.interface';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async checkLoggedIn(request: Request): Promise<void> {
    try {
      const cookie = request.cookies['token'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) throw new UnauthorizedException('Unauthorized.');
    } catch {
      throw new UnauthorizedException('Unauthorized.');
    }
  }

  @Get('/:id')
  async getUser(
    @Req() request: Request,
    @Param('id') id: number,
  ): Promise<User> {
    await this.checkLoggedIn(request);

    return this.userService.findById(id);
  }

  @Get('/')
  async getAllUsers(@Req() request: Request): Promise<User[]> {
    await this.checkLoggedIn(request);

    return this.userService.findAll();
  }

  @Post('/')
  async addUser(
    @Req() request: Request,
    @Body() user: CreateUser,
  ): Promise<User> {
    await this.checkLoggedIn(request);

    return this.userService.create(user);
  }

  @Delete('/:id')
  async deleteUser(
    @Req() request: Request,
    @Param('id') id: number,
  ): Promise<void> {
    await this.checkLoggedIn(request);

    await this.userService.deleteById(id);
  }
}

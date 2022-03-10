import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './domain/user/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { UserService } from './domain/user/user.service';
import * as Bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, password: string): Promise<void> {
    const hashedPassword = await Bcrypt.hash(password, 12);
    await this.userService.create({ name, password: hashedPassword });
  }

  async login(name: string, password: string): Promise<string> {
    const user = await this.userService.findByName(name);
    if (!user) throw new NotFoundException("Credentials don't match.");

    if (!(await Bcrypt.compare(password, user.password))) {
      throw new NotFoundException("Credentials don't match.");
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
    });

    return token;
  }
}

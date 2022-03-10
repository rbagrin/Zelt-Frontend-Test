import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll<User>({ attributes: ['id', 'name'] });
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne<User>({
      where: { id },
      attributes: ['id', 'name'],
    });
  }

  async findByName(name: string): Promise<User> {
    return this.userRepository.findOne<User>({ where: { name } });
  }

  async create(user: CreateUser): Promise<User> {
    return this.userRepository.create<User>({
      name: user.name,
      password: user.password,
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository.destroy({ where: { id } });
  }
}

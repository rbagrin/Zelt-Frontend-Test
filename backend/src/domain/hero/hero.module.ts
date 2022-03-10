import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { heroProviders } from './hero.provider';
import { DatabaseModule } from '../../infrastructure/db/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'SECRET_VALUE',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [HeroController],
  providers: [HeroService, ...heroProviders],
  exports: [HeroService],
})
export class HeroModule {}

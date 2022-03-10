import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './domain/hero/hero.module';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [
    UserModule,
    HeroModule,
    JwtModule.register({
      secret: 'SECRET_VALUE',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

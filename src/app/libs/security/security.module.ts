import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenStrategy } from './refresh-jwt.strategy';
import { SecurityService } from './security.service';
import { UsersModule } from 'src/app/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    PassportModule,
    JwtModule.register({}),
    UsersModule,
  ],
  providers: [SecurityService, JwtStrategy, RefreshTokenStrategy],
  exports: [SecurityService],
})
export class SecurityModule {}

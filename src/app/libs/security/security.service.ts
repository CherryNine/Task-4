import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersRepo } from 'src/domain/repos/users-repo';

@Injectable()
export class SecurityService {
  constructor(
    private usersRepo: UsersRepo,
    private jwtService: JwtService,
  ) {}

  async comparePasswords(
    formPassword: string,
    userPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(formPassword, userPassword);
  }

  async getAccessToken(user: Pick<User, 'email' | 'id'>) {
    const accessToken = await this.jwtService.signAsync(
      { email: user.email, sub: user.id },
      {
        secret: process.env.SECRET,
        expiresIn: '15h',
      },
    );
    return accessToken;
  }

  async getAndSaveRefreshToken(user: Pick<User, 'email' | 'id'>) {
    const refreshToken = await this.jwtService.signAsync(
      { email: user.email, sub: user.id },
      {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '7d',
      },
    );
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 8);
    await this.usersRepo.update({
      id: user.id,
      refreshToken: hashedRefreshToken,
    });
    return refreshToken;
  }

  async compareRefreshTokens(
    refreshToken: string,
    refreshTokenDb: string,
  ): Promise<boolean> {
    return bcrypt.compare(refreshToken, refreshTokenDb);
  }
}

import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { UserSessionDto } from 'src/domain/dtos/user-session.dto';
import { CurrentUser } from '../libs/security/decorators/current-user.decorator';
import { TokensDto } from 'src/domain/dtos/tokens.dto';
import { CreateUserForm } from '../users/domain/create-user.form';
import { AuthService } from './auth.service';
import { LoginForm } from './domain/login.form';
import { Public } from '../libs/security/decorators/public.decorator';
import { RefreshTokenGuard } from '../libs/security/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('register')
  async create(@Body() body: CreateUserForm) {
    const form = CreateUserForm.from(body);
    const errors = await CreateUserForm.validate(form);
    if (errors) {
      throw new BadRequestException();
    }
    const userExists = await this.usersService.findByEmail({
      email: body.email,
    });
    if (userExists) {
      throw new ConflictException('User already exists!');
    }
    const entity = await this.usersService.create(form);
    if (!entity) {
      throw new ConflictException();
    }
    return this.authService.authenticate(entity);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginForm): Promise<TokensDto> {
    const form = LoginForm.from(body);
    const errors = await LoginForm.validate(form);
    if (errors) {
      throw new BadRequestException();
    }

    const user = await this.usersService.findByEmail({ email: form.email });
    if (!user) throw new NotFoundException('User not found!');
    if (user.status === 'blocked')
      throw new HttpException('User is blocked!', HttpStatus.FORBIDDEN);

    const isValid = await this.authService.comparePasswords(
      form.password,
      user,
    );
    if (!isValid) {
      throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
    }

    return this.authService.authenticate(user);
  }

  @Post('logout')
  async logout(@CurrentUser() currentUser: UserSessionDto): Promise<boolean> {
    await this.authService.logout({ id: currentUser.sub, refreshToken: null });
    return true;
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @CurrentUser() currentUser: UserSessionDto,
  ): Promise<TokensDto> {
    const user = await this.usersService.findById({ id: currentUser.sub });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.FORBIDDEN);
    }
    if (!user.refreshToken) {
      throw new HttpException('No refresh token', HttpStatus.FORBIDDEN);
    }
    const refreshTokenMatches = await this.authService.compareRefreshTokens(
      currentUser.refreshToken,
      user,
    );
    if (!refreshTokenMatches) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.authService.authenticate(user);
  }
}

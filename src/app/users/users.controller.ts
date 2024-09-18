import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/domain/dtos/create-user.dto';
import { JwtAuthGuard } from '../libs/security/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('delete')
  removeMany(@Body() body: { ids: string[] }) {
    return this.usersService.delete(body.ids);
  }

  @Post('change-status')
  async changeStatus(
    @Body() body: { ids: string[]; status: 'blocked' | 'unblocked' },
  ) {
    return this.usersService.updateStatus(body.ids, body.status);
  }
}

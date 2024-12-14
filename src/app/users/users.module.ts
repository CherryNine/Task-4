import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepo } from 'src/domain/repos/users-repo';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepo],
  exports: [UsersService, UsersRepo],
})
export class UsersModule {}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepo {
  constructor(private readonly client: PrismaService) {}
  async findAll() {
    return this.client.user.findMany({});
  }
  async findByEmail(user: Pick<User, 'email'>): Promise<User> {
    return await this.client.user.findUnique({
      where: { email: user.email },
    });
  }
  async create(
    user: Pick<User, 'email' | 'first_name' | 'last_name' | 'password'>,
  ): Promise<User> {
    return await this.client.user.create({
      data: user,
    });
  }
  async findById(user: Pick<User, 'id'>): Promise<User> {
    return await this.client.user.findUnique({
      where: { id: user.id },
    });
  }
  async delete(user: Pick<User, 'id'>): Promise<User> {
    return this.client.user.delete({ where: { id: user.id } });
  }
  async updateStatus(id: string, status: string): Promise<User> {
    return this.client.user.update({
      where: { id },
      data: { status },
    });
  }

  async update(user: Partial<User>): Promise<User> {
    return await this.client.user.update({
      where: { id: user.id },
      data: user,
    });
  }
}

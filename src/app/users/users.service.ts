import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UsersRepo } from 'src/domain/repos/users-repo';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepo) {}

  async create(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.usersRepo.create({
      ...user,
      password: hashedPassword,
    });
  }

  async findAll() {
    return this.usersRepo.findAll();
  }
  async findByEmail(user: Pick<User, 'email'>) {
    return this.usersRepo.findByEmail(user);
  }
  async findById(user: Pick<User, 'id'>) {
    return this.usersRepo.findById(user);
  }

  async delete(ids: string | string[]) {
    if (Array.isArray(ids)) {
      return Promise.all(ids.map((id) => this.usersRepo.delete({ id })));
    } else {
      return this.usersRepo.delete({ id: ids });
    }
  }

  async updateStatus(ids: string | string[], status: 'blocked' | 'unblocked') {
    const updatePromises: Promise<User>[] = [];

    const updateData = { status };

    if (Array.isArray(ids)) {
      for (const id of ids) {
        updatePromises.push(this.usersRepo.update({ id, ...updateData }));
      }
    } else {
      updatePromises.push(this.usersRepo.update({ id: ids, ...updateData }));
    }

    return Promise.all(updatePromises);
  }
}

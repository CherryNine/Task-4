import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersRepo {
    private readonly client;
    constructor(client: PrismaService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        status: string;
        refreshToken: string | null;
    }[]>;
    findByEmail(user: Pick<User, 'email'>): Promise<User>;
    create(user: Pick<User, 'email' | 'first_name' | 'last_name' | 'password'>): Promise<User>;
    findById(user: Pick<User, 'id'>): Promise<User>;
    delete(user: Pick<User, 'id'>): Promise<User>;
    updateStatus(id: string, status: string): Promise<User>;
    update(user: Partial<User>): Promise<User>;
}

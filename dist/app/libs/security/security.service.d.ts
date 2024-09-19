import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersRepo } from 'src/domain/repos/users-repo';
export declare class SecurityService {
    private usersRepo;
    private jwtService;
    constructor(usersRepo: UsersRepo, jwtService: JwtService);
    comparePasswords(formPassword: string, userPassword: string): Promise<boolean>;
    getAccessToken(user: Pick<User, 'email' | 'id'>): Promise<string>;
    getAndSaveRefreshToken(user: Pick<User, 'email' | 'id'>): Promise<string>;
    compareRefreshTokens(refreshToken: string, refreshTokenDb: string): Promise<boolean>;
}

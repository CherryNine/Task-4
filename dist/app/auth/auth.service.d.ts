import { User } from '@prisma/client';
import { SecurityService } from '../libs/security/security.service';
import { UsersRepo } from 'src/domain/repos/users-repo';
import { TokensDto } from 'src/domain/dtos/tokens.dto';
export declare class AuthService {
    private usersRepo;
    private securityService;
    constructor(usersRepo: UsersRepo, securityService: SecurityService);
    authenticate(user: Pick<User, 'email' | 'id'>): Promise<TokensDto>;
    comparePasswords(formPassword: string, user: User): Promise<boolean>;
    logout(user: Pick<User, 'id' | 'refreshToken'>): Promise<User>;
    compareRefreshTokens(refreshToken: string, user: User): Promise<boolean>;
    private generateTokens;
}

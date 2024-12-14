import { UsersService } from '../users/users.service';
import { UserSessionDto } from 'src/domain/dtos/user-session.dto';
import { TokensDto } from 'src/domain/dtos/tokens.dto';
import { CreateUserForm } from '../users/domain/create-user.form';
import { AuthService } from './auth.service';
import { LoginForm } from './domain/login.form';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    create(body: CreateUserForm): Promise<TokensDto>;
    login(body: LoginForm): Promise<TokensDto>;
    logout(currentUser: UserSessionDto): Promise<boolean>;
    refreshTokens(currentUser: UserSessionDto): Promise<TokensDto>;
}

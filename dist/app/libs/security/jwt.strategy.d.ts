import { Strategy } from 'passport-jwt';
import { UserSessionDto } from 'src/domain/dtos/user-session.dto';
import { UsersRepo } from 'src/domain/repos/users-repo';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersRepo;
    constructor(usersRepo: UsersRepo);
    validate(payload: UserSessionDto): Promise<UserSessionDto>;
}
export {};

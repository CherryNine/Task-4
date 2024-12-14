import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { UserSessionDto } from 'src/domain/dtos/user-session.dto';
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor();
    validate(req: Request, payload: UserSessionDto): {
        refreshToken: string;
        email: string;
        sub: string;
    };
}
export {};

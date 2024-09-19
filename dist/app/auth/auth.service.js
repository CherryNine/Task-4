"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const security_service_1 = require("../libs/security/security.service");
const users_repo_1 = require("../../domain/repos/users-repo");
let AuthService = class AuthService {
    constructor(usersRepo, securityService) {
        this.usersRepo = usersRepo;
        this.securityService = securityService;
    }
    async authenticate(user) {
        const [accessToken, refreshToken] = await this.generateTokens(user);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async comparePasswords(formPassword, user) {
        return this.securityService.comparePasswords(formPassword, user.password);
    }
    async logout(user) {
        return this.usersRepo.update(user);
    }
    async compareRefreshTokens(refreshToken, user) {
        return this.securityService.compareRefreshTokens(refreshToken, user.refreshToken);
    }
    async generateTokens(user) {
        const [accessToken, refreshToken] = await Promise.all([
            this.securityService.getAccessToken(user),
            this.securityService.getAndSaveRefreshToken(user),
        ]);
        return [accessToken, refreshToken];
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repo_1.UsersRepo,
        security_service_1.SecurityService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
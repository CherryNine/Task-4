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
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_repo_1 = require("../../../domain/repos/users-repo");
let SecurityService = class SecurityService {
    constructor(usersRepo, jwtService) {
        this.usersRepo = usersRepo;
        this.jwtService = jwtService;
    }
    async comparePasswords(formPassword, userPassword) {
        return bcrypt.compare(formPassword, userPassword);
    }
    async getAccessToken(user) {
        const accessToken = await this.jwtService.signAsync({ email: user.email, sub: user.id }, {
            secret: process.env.SECRET,
            expiresIn: '15h',
        });
        return accessToken;
    }
    async getAndSaveRefreshToken(user) {
        const refreshToken = await this.jwtService.signAsync({ email: user.email, sub: user.id }, {
            secret: process.env.REFRESH_SECRET,
            expiresIn: '7d',
        });
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 8);
        await this.usersRepo.update({
            id: user.id,
            refreshToken: hashedRefreshToken,
        });
        return refreshToken;
    }
    async compareRefreshTokens(refreshToken, refreshTokenDb) {
        return bcrypt.compare(refreshToken, refreshTokenDb);
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repo_1.UsersRepo,
        jwt_1.JwtService])
], SecurityService);
//# sourceMappingURL=security.service.js.map
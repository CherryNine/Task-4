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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const user_session_dto_1 = require("../../domain/dtos/user-session.dto");
const current_user_decorator_1 = require("../libs/security/decorators/current-user.decorator");
const create_user_form_1 = require("../users/domain/create-user.form");
const auth_service_1 = require("./auth.service");
const login_form_1 = require("./domain/login.form");
const public_decorator_1 = require("../libs/security/decorators/public.decorator");
const refresh_token_guard_1 = require("../libs/security/guards/refresh-token.guard");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async create(body) {
        const form = create_user_form_1.CreateUserForm.from(body);
        const errors = await create_user_form_1.CreateUserForm.validate(form);
        if (errors) {
            throw new common_1.BadRequestException();
        }
        const userExists = await this.usersService.findByEmail({
            email: body.email,
        });
        if (userExists) {
            throw new common_1.ConflictException('User already exists!');
        }
        const entity = await this.usersService.create(form);
        if (!entity) {
            throw new common_1.ConflictException();
        }
        return this.authService.authenticate(entity);
    }
    async login(body) {
        const form = login_form_1.LoginForm.from(body);
        const errors = await login_form_1.LoginForm.validate(form);
        if (errors) {
            throw new common_1.BadRequestException();
        }
        const user = await this.usersService.findByEmail({ email: form.email });
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        if (user.status === 'blocked')
            throw new common_1.HttpException('User is blocked!', common_1.HttpStatus.FORBIDDEN);
        const isValid = await this.authService.comparePasswords(form.password, user);
        if (!isValid) {
            throw new common_1.HttpException('Invalid password', common_1.HttpStatus.FORBIDDEN);
        }
        return this.authService.authenticate(user);
    }
    async logout(currentUser) {
        await this.authService.logout({ id: currentUser.sub, refreshToken: null });
        return true;
    }
    async refreshTokens(currentUser) {
        const user = await this.usersService.findById({ id: currentUser.sub });
        if (!user) {
            throw new common_1.HttpException('User not found!', common_1.HttpStatus.FORBIDDEN);
        }
        if (!user.refreshToken) {
            throw new common_1.HttpException('No refresh token', common_1.HttpStatus.FORBIDDEN);
        }
        const refreshTokenMatches = await this.authService.compareRefreshTokens(currentUser.refreshToken, user);
        if (!refreshTokenMatches) {
            throw new common_1.HttpException('Refresh token is not valid', common_1.HttpStatus.FORBIDDEN);
        }
        return this.authService.authenticate(user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_form_1.CreateUserForm]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_form_1.LoginForm]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_session_dto_1.UserSessionDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(refresh_token_guard_1.RefreshTokenGuard),
    (0, common_1.Get)('refresh'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_session_dto_1.UserSessionDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
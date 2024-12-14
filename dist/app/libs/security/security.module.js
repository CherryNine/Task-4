"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt.strategy");
const refresh_jwt_strategy_1 = require("./refresh-jwt.strategy");
const security_service_1 = require("./security.service");
const users_module_1 = require("../../users/users.module");
let SecurityModule = class SecurityModule {
};
exports.SecurityModule = SecurityModule;
exports.SecurityModule = SecurityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.development.env',
            }),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({}),
            users_module_1.UsersModule,
        ],
        providers: [security_service_1.SecurityService, jwt_strategy_1.JwtStrategy, refresh_jwt_strategy_1.RefreshTokenStrategy],
        exports: [security_service_1.SecurityService],
    })
], SecurityModule);
//# sourceMappingURL=security.module.js.map
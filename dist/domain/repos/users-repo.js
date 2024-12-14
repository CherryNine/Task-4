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
exports.UsersRepo = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UsersRepo = class UsersRepo {
    constructor(client) {
        this.client = client;
    }
    async findAll() {
        return this.client.user.findMany({});
    }
    async findByEmail(user) {
        return await this.client.user.findUnique({
            where: { email: user.email },
        });
    }
    async create(user) {
        return await this.client.user.create({
            data: user,
        });
    }
    async findById(user) {
        return await this.client.user.findUnique({
            where: { id: user.id },
        });
    }
    async delete(user) {
        return this.client.user.delete({ where: { id: user.id } });
    }
    async updateStatus(id, status) {
        return this.client.user.update({
            where: { id },
            data: { status },
        });
    }
    async update(user) {
        return await this.client.user.update({
            where: { id: user.id },
            data: user,
        });
    }
};
exports.UsersRepo = UsersRepo;
exports.UsersRepo = UsersRepo = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersRepo);
//# sourceMappingURL=users-repo.js.map
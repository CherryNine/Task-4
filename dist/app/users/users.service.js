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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_repo_1 = require("../../domain/repos/users-repo");
let UsersService = class UsersService {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
    }
    async create(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return this.usersRepo.create({
            ...user,
            password: hashedPassword,
        });
    }
    async findAll() {
        return this.usersRepo.findAll();
    }
    async findByEmail(user) {
        return this.usersRepo.findByEmail(user);
    }
    async findById(user) {
        return this.usersRepo.findById(user);
    }
    async delete(ids) {
        if (Array.isArray(ids)) {
            return Promise.all(ids.map((id) => this.usersRepo.delete({ id })));
        }
        else {
            return this.usersRepo.delete({ id: ids });
        }
    }
    async updateStatus(ids, status) {
        const updatePromises = [];
        const updateData = { status };
        if (Array.isArray(ids)) {
            for (const id of ids) {
                updatePromises.push(this.usersRepo.update({ id, ...updateData }));
            }
        }
        else {
            updatePromises.push(this.usersRepo.update({ id: ids, ...updateData }));
        }
        return Promise.all(updatePromises);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repo_1.UsersRepo])
], UsersService);
//# sourceMappingURL=users.service.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const UserRepository_1 = require("./UserRepository");
const prisma = new client_1.PrismaClient();
class UserRepositoryPrisma extends UserRepository_1.UserRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // prisma Users
            let datas = yield prisma.user.findMany();
            // map to UserEntities
            let users = [];
            datas.forEach((data) => {
                let user = data;
                users.push(user);
            });
            return users;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield prisma.user.findUnique({ where: { id: id } });
            if (data) {
                let user = data;
                return user;
            }
            else {
                return null;
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = user.info ? user.info : undefined;
            let response = yield prisma.user.create({
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    info: info,
                    password: user.password,
                    userRole: client_1.UserRole.DEFAULT,
                    avatar: user.avatar,
                    googleUserId: user.googleUserId,
                    userStatus: client_1.UserStatus.PENDING,
                    verCode: user.verCode,
                },
            });
            let out = response;
            return out;
        });
    }
    getUserInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.user.findUnique({
                where: {
                    id: id,
                },
                select: {
                    info: true,
                },
            });
            if (response === null) {
                return null;
            }
            else {
                return response.info;
            }
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.user.update({
                where: {
                    id: data.id,
                },
                data: {
                    email: data.email,
                    username: data.username,
                    info: data,
                    password: data.password,
                    userRole: data.userRole,
                    avatar: data.avatar,
                    googleUserId: data.googleUserId,
                    userStatus: data.userStatus,
                },
            });
            let updated = response;
            return updated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.user.delete({
                where: { id: id },
            });
            if (response) {
                let deletedUser = response;
                return deletedUser;
            }
            else {
                return null;
            }
        });
    }
    archive(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    userStatus: client_1.UserStatus.ARCHIVED,
                },
            });
            if (response) {
                let archivedUser = response;
                return archivedUser;
            }
            else {
                return null;
            }
        });
    }
    approve(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    userStatus: client_1.UserStatus.ACTIVE,
                },
            });
            if (response) {
                let archivedUser = response;
                return archivedUser;
            }
            else {
                return null;
            }
        });
    }
    giveAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    userRole: client_1.UserRole.ADMIN,
                },
            });
            if (response) {
                let archivedUser = response;
                return archivedUser;
            }
            else {
                return null;
            }
        });
    }
    checkVercode(id, vercode) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if ((response === null || response === void 0 ? void 0 : response.verCode) == vercode) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.default = UserRepositoryPrisma;

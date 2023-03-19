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
const ConnectionRepository_1 = require("./ConnectionRepository");
const prisma = new client_1.PrismaClient();
class ConnectionRepositoryPrisma extends ConnectionRepository_1.ConnectionRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // prisma Connections
            let datas = yield prisma.connection.findMany();
            // map to ConnectionEntities
            let connections = [];
            datas.forEach((data) => {
                let connection = data;
                connections.push(connection);
            });
            return connections;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield prisma.connection.findUnique({
                where: { id: id },
                include: { device: true, req: true, res: true },
            });
            if (data) {
                let connection = data;
                return connection;
            }
            else {
                return null;
            }
        });
    }
    create(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.connection.create({
                data: {
                    id: connection.id,
                    connectionStatus: client_1.ConnectionStatus.PENDING,
                },
            });
            let out = response;
            return out;
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.connection.update({
                where: {
                    id: data.id,
                },
                data: {
                    connectionStatus: data.connectionStatus,
                },
            });
            let updated = response;
            return updated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.connection.delete({
                where: { id: id },
            });
            if (response) {
                let deletedConnection = response;
                return deletedConnection;
            }
            else {
                return null;
            }
        });
    }
    archive(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.connection.update({
                where: {
                    id: id,
                },
                data: {
                    connectionStatus: client_1.ConnectionStatus.ARCHIVED,
                },
            });
            if (response) {
                let archivedConnection = response;
                return archivedConnection;
            }
            else {
                return null;
            }
        });
    }
}
exports.default = ConnectionRepositoryPrisma;

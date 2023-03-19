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
const DeviceRepository_1 = require("./DeviceRepository");
const prisma = new client_1.PrismaClient();
class DeviceRepositoryPrisma extends DeviceRepository_1.DeviceRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let datas = yield prisma.device.findMany();
            // map to UserEntities
            let devices = [];
            datas.forEach((data) => {
                let device = data;
                devices.push(device);
            });
            return devices;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.device.findUnique({
                where: {
                    id: id,
                },
            });
            if (response) {
                let device = response;
                return device;
            }
            else {
                return null;
            }
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.device.update({
                where: {
                    id: data.id,
                },
                data: {
                    name: data.name,
                    status: data.status,
                },
            });
            let updatedDevice = response;
            return updatedDevice;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.device.delete({
                where: {
                    id: id,
                },
            });
            let deletedDevice = response;
            return deletedDevice;
        });
    }
    quarantine(id, reqId) {
        return __awaiter(this, void 0, void 0, function* () {
            let device = yield prisma.device.findUnique({
                where: {
                    id: id,
                },
            });
            let q = device === null || device === void 0 ? void 0 : device.quarantine;
            q === null || q === void 0 ? void 0 : q.push(reqId);
            let response = yield prisma.device.update({
                where: {
                    id: id,
                },
                data: {
                    quarantine: q,
                },
            });
            if (response) {
                return "success";
            }
            else {
                return "failure";
            }
        });
    }
}
exports.default = DeviceRepositoryPrisma;

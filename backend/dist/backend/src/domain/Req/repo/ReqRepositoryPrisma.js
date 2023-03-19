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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ReqRepository_1 = require("./ReqRepository");
const flagReqInteractor_1 = __importDefault(require("../../Connection/interactors/flagReqInteractor"));
const addToQuarantineInteractor_1 = __importDefault(require("../../Device/interactors/addToQuarantineInteractor"));
const DeviceRepositoryPrisma_1 = __importDefault(require("../../Device/repo/DeviceRepositoryPrisma"));
const prisma = new client_1.PrismaClient();
const devRepo = new DeviceRepositoryPrisma_1.default();
class ReqRepositoryPrisma extends ReqRepository_1.ReqRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // prisma Reqs
            let datas = yield prisma.req.findMany({
                include: {
                    res: true,
                },
            });
            // map to ReqEntities
            let reqs = [];
            datas.forEach((data) => {
                let req = data;
                reqs.push(req);
            });
            return reqs;
        });
    }
    getFlagged() {
        return __awaiter(this, void 0, void 0, function* () {
            // prisma Reqs
            let datas = yield prisma.req.findMany({
                where: {
                    isThreat: true,
                },
            });
            // map to ReqEntities
            let reqs = [];
            datas.forEach((data) => {
                let req = data;
                reqs.push(req);
            });
            return reqs;
        });
    }
    getFlaggedByDeviceId(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            // prisma Reqs
            let datas = yield prisma.req.findMany({
                where: {
                    deviceId: deviceId,
                    isThreat: true,
                },
            });
            // map to ReqEntities
            let reqs = [];
            datas.forEach((data) => {
                let req = data;
                reqs.push(req);
            });
            return reqs;
        });
    }
    getAllByConnectionId(connectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            // prisma Reqs
            let datas = yield prisma.req.findMany({
                where: {
                    connectionId: connectionId,
                },
                include: {
                    res: true,
                },
            });
            // map to ReqEntities
            let reqs = [];
            datas.forEach((data) => {
                let req = data;
                reqs.push(req);
            });
            return reqs;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield prisma.req.findUnique({
                where: { id: id },
                include: { res: true },
            });
            if (data) {
                let req = data;
                return req;
            }
            else {
                return null;
            }
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.req.create({
                data: {
                    id: req.id,
                    connectionId: req.connectionId,
                    httpVersion: req.httpVersion,
                    httpMethod: req.httpMethod,
                    body: req.body,
                    deviceId: req.deviceId,
                    isThreat: req.isThreat,
                },
            });
            let out = response;
            return out;
        });
    }
    // async update(data: updateReqEntity) {
    //   let response = await prisma.req.update({
    //     where: {
    //       id: data.id,
    //     },
    //     data: {
    //       connectionId: data.connectionId,
    //       httpVersion: data.httpVersion,
    //       httpMethod: data.httpMethod,
    //       body: data.body,
    //       deviceId: data.deviceId,
    //       isThreat: data.isThreat,
    //     },
    //   });
    //   let updated: ReqEntity = response;
    //   return updated;
    // }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.req.delete({
                where: { id: id },
            });
            if (response) {
                let deletedReq = response;
                return deletedReq;
            }
            else {
                return null;
            }
        });
    }
    flag(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.req.update({
                where: {
                    id: id,
                },
                data: {
                    isThreat: true,
                },
            });
            (0, addToQuarantineInteractor_1.default)(devRepo, response.deviceId, id);
            if (response) {
                let result = response;
                return result;
            }
            else {
                return null;
            }
        });
    }
    respond(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield prisma.res.create({
                data: {
                    connectionId: res.connectionId,
                    code: res.code,
                    reqId: id,
                },
            });
            if (response) {
                let res = response;
                return res;
            }
            else {
                return null;
            }
        });
    }
    scan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqs = yield prisma.req.findMany({
                where: {
                    deviceId: id,
                },
            });
            let device = yield prisma.device.findUnique({
                where: {
                    id: id,
                },
            });
            let localKeyWs = device === null || device === void 0 ? void 0 : device.keywords;
            let threats = yield prisma.threat.findMany();
            let flag = false;
            let keyws = [];
            let flagged = [];
            let num = 0;
            reqs.forEach((r) => {
                threats.forEach((t) => {
                    keyws = t.keywords.split(":");
                    localKeyWs === null || localKeyWs === void 0 ? void 0 : localKeyWs.forEach((local) => {
                        keyws.push(local);
                    });
                    keyws.forEach((k) => {
                        if (r.body.includes(k))
                            num += 1;
                    });
                    if (num > 2)
                        flag = true;
                    num = 0;
                });
                if (flag) {
                    flagged.push(r);
                }
                flag = false;
            });
            let reqRepo = new ReqRepositoryPrisma();
            flagged.forEach((f) => {
                (0, flagReqInteractor_1.default)(reqRepo, f.id);
            });
            if (flagged.length > 0) {
                return flagged;
            }
            else {
                return null;
            }
        });
    }
}
exports.default = ReqRepositoryPrisma;

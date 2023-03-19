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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const body_parser_1 = __importDefault(require("body-parser"));
const DeviceRepositoryPrisma_1 = __importDefault(require("../repo/DeviceRepositoryPrisma"));
const listDevicesInteractor_1 = __importDefault(require("../interactors/listDevicesInteractor"));
const getDeviceByIdInteractor_1 = __importDefault(require("../interactors/getDeviceByIdInteractor"));
const updateDeviceInteractor_1 = __importDefault(require("../interactors/updateDeviceInteractor"));
const deleteDeviceInteractor_1 = __importDefault(require("../interactors/deleteDeviceInteractor"));
const scanInteractor_1 = __importDefault(require("../interactors/scanInteractor"));
const ReqRepositoryPrisma_1 = __importDefault(require("../../Req/repo/ReqRepositoryPrisma"));
const addToQuarantineInteractor_1 = __importDefault(require("../interactors/addToQuarantineInteractor"));
const repo = new DeviceRepositoryPrisma_1.default();
const reqRepo = new ReqRepositoryPrisma_1.default();
router.use((req, res, next) => {
    console.log(req.method);
    console.log("Time: ", Date.now());
    next();
});
var jsonParser = body_parser_1.default.json();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, listDevicesInteractor_1.default)(repo);
    res.status(200).json(data);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deviceId = req.params.id;
    let data = yield (0, getDeviceByIdInteractor_1.default)(repo, deviceId);
    res.status(200).json(data);
}));
router.patch("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deviceId = req.params.id;
    let body = yield req.body;
    let updateData = Object.assign(Object.assign({}, body), { id: deviceId });
    let data = yield (0, updateDeviceInteractor_1.default)(repo, updateData);
    res.status(200).json(data);
}));
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deviceId = req.params.id;
    let deletedDevice = yield (0, deleteDeviceInteractor_1.default)(repo, deviceId);
    res.status(200).json(deletedDevice);
}));
router.get("/scan/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deviceId = req.params.id;
    let data = yield (0, scanInteractor_1.default)(reqRepo, deviceId);
    res.status(200).json(data);
}));
router.get("/quarantine/:id/:reqId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deviceId = req.params.id;
    let data = yield (0, addToQuarantineInteractor_1.default)(repo, deviceId, req.params.reqId);
    res.status(200).json(data);
}));
exports.default = router;

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
const createConnectionInteractor_1 = __importDefault(require("../interactors/createConnectionInteractor"));
const getConnectionByIdInteractor_1 = __importDefault(require("../interactors/getConnectionByIdInteractor"));
const listConnectionsInteractor_1 = __importDefault(require("../interactors/listConnectionsInteractor"));
const ConnectionRepositoryPrisma_1 = __importDefault(require("../repo/ConnectionRepositoryPrisma"));
const body_parser_1 = __importDefault(require("body-parser"));
const updateConnectionInteractor_1 = __importDefault(require("../interactors/updateConnectionInteractor"));
const deleteConnectionInteractor_1 = __importDefault(require("../interactors/deleteConnectionInteractor"));
const archiveConnectionInteractor_1 = __importDefault(require("../interactors/archiveConnectionInteractor"));
const listReqsInConnectionInteractor_1 = __importDefault(require("../interactors/listReqsInConnectionInteractor"));
const ReqRepositoryPrisma_1 = __importDefault(require("../../Req/repo/ReqRepositoryPrisma"));
const respondToReqInteractor_1 = __importDefault(require("../interactors/respondToReqInteractor"));
const flagReqInteractor_1 = __importDefault(require("../interactors/flagReqInteractor"));
const repo = new ConnectionRepositoryPrisma_1.default();
const reqRepo = new ReqRepositoryPrisma_1.default();
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});
var jsonParser = body_parser_1.default.json();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, listConnectionsInteractor_1.default)(repo);
    res.status(200).json(data);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, getConnectionByIdInteractor_1.default)(repo, req.params.id);
    res.status(200).json(data);
}));
router.get("/reqs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, listReqsInConnectionInteractor_1.default)(reqRepo, req.params.id);
    res.status(200).json(data);
}));
router.post("/reqs/respond/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = req.body;
    let data = yield (0, respondToReqInteractor_1.default)(reqRepo, req.params.id, response);
    res.status(200).json(data);
}));
router.post("/connect", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection = yield req.body;
    let data = yield (0, createConnectionInteractor_1.default)(repo, connection);
    res.status(200).json(data);
}));
router.patch("/disconnect/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, archiveConnectionInteractor_1.default)(repo, req.params.id);
    res.status(200).json(data);
}));
router.patch("/update/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = yield req.body;
    let connection = Object.assign(Object.assign({}, body), { id: req.params.id });
    let data = yield (0, updateConnectionInteractor_1.default)(repo, connection);
    res.status(200).json(data);
}));
router.patch("/archive/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connectionId = req.params.id;
    let data = yield (0, archiveConnectionInteractor_1.default)(repo, connectionId);
    res.status(200).json(data);
}));
router.delete("/delete/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connectionId = req.params.id;
    let data = yield (0, deleteConnectionInteractor_1.default)(repo, connectionId);
    res.status(200).json(data);
}));
router.patch("/flag/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let flagged = yield (0, flagReqInteractor_1.default)(reqRepo, req.params.id);
    res.status(200).json(flagged);
}));
exports.default = router;

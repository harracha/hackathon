"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const router = express_1.default.Router();
const createUserInteractor_1 = __importDefault(require("../interactors/createUserInteractor"));
const getUserByIdInteractor_1 = __importDefault(require("../interactors/getUserByIdInteractor"));
const listUsersInteractor_1 = __importDefault(require("../interactors/listUsersInteractor"));
const UserRepositoryPrisma_1 = __importDefault(require("../repo/UserRepositoryPrisma"));
const body_parser_1 = __importDefault(require("body-parser"));
const updateUserInteractor_1 = __importDefault(require("../interactors/updateUserInteractor"));
const deleteUserInteractor_1 = __importDefault(require("../interactors/deleteUserInteractor"));
const archiveUserInteractor_1 = __importDefault(require("../interactors/archiveUserInteractor"));
const approveUserInteractor_1 = __importDefault(require("../interactors/approveUserInteractor"));
const giveAdminInteractor_1 = __importDefault(require("../interactors/giveAdminInteractor"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const checkVercodeInteractor_1 = __importDefault(require("../interactors/checkVercodeInteractor"));
const auth_1 = require("../../../auth/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const listAllFlaggedInteractor_1 = __importDefault(require("../interactors/listAllFlaggedInteractor"));
const ReqRepositoryPrisma_1 = __importDefault(require("../../Req/repo/ReqRepositoryPrisma"));
const prisma = new client_1.PrismaClient();
const repo = new UserRepositoryPrisma_1.default();
const jwt = require("jsonwebtoken");
const reqRepo = new ReqRepositoryPrisma_1.default();
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});
router.use((0, express_1.urlencoded)({ extended: true }));
router.use(express_1.default.json());
var jsonParser = body_parser_1.default.json();
dotenv_1.default.config();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const token = req.headers.authorization?.split('')[1];
    // try {
    //   const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //   const userEmail = decoded.email;
    //   res.send(`${userEmail}`)
    // }
    // catch(error) {
    //   console.log(error)
    let data = yield (0, listUsersInteractor_1.default)(repo);
    res.status(200).json(data);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, getUserByIdInteractor_1.default)(repo, req.params.id);
    res.status(200).json(data);
}));
router.post("/create", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verCode = (0, auth_1.generateRandomString)(16);
    let user = Object.assign(Object.assign({}, (yield req.body)), { password: yield bcrypt_1.default.hash(req.body.password, 10), verCode: verCode });
    let data = yield (0, createUserInteractor_1.default)(repo, user);
    const str = "http://localhost:4000/user/verCode/" + user.id + "/" + verCode;
    const html = `<h1>HŽV</h1>
      <p>za verifikaciju stisni na link</p>
      <a href="` +
        str +
        `">dobar dan na hackathon</a>
    `;
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: "brainet_user_link@outlook.com",
            pass: "Brainetlozinka",
        },
    });
    const mailOptions = {
        from: "brainet_user_link@outlook.com",
        to: user.email,
        subject: "Verification",
        html: html,
    };
    yield transporter.sendMail(mailOptions);
    res.status(200).json(data);
}));
router.patch("/update/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = yield req.body;
    let user = Object.assign(Object.assign({}, body), { id: req.params.id });
    let data = yield (0, updateUserInteractor_1.default)(repo, user);
    res.status(200).json(data);
}));
router.patch("/archive/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.id;
    let data = yield (0, archiveUserInteractor_1.default)(repo, userId);
    res.status(200).json(data);
}));
router.patch("/admin/approve/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.id;
    let data = yield (0, approveUserInteractor_1.default)(repo, userId);
    res.status(200).json(data);
}));
router.patch("/admin/giveAdmin/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.id;
    let data = yield (0, giveAdminInteractor_1.default)(repo, userId);
    res.status(200).json(data);
}));
router.delete("/delete/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.id;
    let data = yield (0, deleteUserInteractor_1.default)(repo, userId);
    res.status(200).json(data);
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const userHashed = users.find((user) => user.name === req.body.name);
    // if (!userHashed) {
    //   return res.status(400).send('Cannot find user');
    // }
    try {
        let body = yield req.body;
        console.log(body);
        let user = yield prisma.user.findUnique({
            where: {
                email: body.name,
            }
        });
        let tokenizedUser = {
            email: user === null || user === void 0 ? void 0 : user.email,
            password: user === null || user === void 0 ? void 0 : user.password,
            userRole: user === null || user === void 0 ? void 0 : user.userRole,
        };
        //if (await bcrypt.compare(req.body.password, userHashed.password)) {
        //const user = { username : req.body.name, password : req.body.password};
        const accessToken = jwt.sign(tokenizedUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
        res.json({ accessToken: accessToken, userId: user === null || user === void 0 ? void 0 : user.id, userRole: user === null || user === void 0 ? void 0 : user.userRole });
        /* } else {
          res.send('Not Allowed');
        } */
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
router.get("/verCode/:userId/:verCode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, checkVercodeInteractor_1.default)(repo, req.params.userId, req.params.verCode);
    if (data) {
        res.redirect("/user/login");
    }
    else
        res.status(403);
}));
router.get("/admin/flagged", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, listAllFlaggedInteractor_1.default)(reqRepo);
    res.status(200).json(data);
}));
exports.default = router;

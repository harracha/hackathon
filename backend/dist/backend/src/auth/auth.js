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
exports.generateRandomString = exports.auth = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwt = require('jsonwebtoken');
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const router = express_1.default.Router();
exports.auth = router;
router.use(express_1.default.json());
const users = [];
router.get('/', authenticateToken, (req, res) => {
    console.log(users);
    res.json(users);
});
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
        const user = { name: data.name, password: hashedPassword };
        users.push(user);
        const html = `<h1>HŽV</h1>
      <p>za verifikaciju stisni na link</p>
      <a href="https://www.youtube.com/watch?v=cLGMWX-DSzY">dobar dan na hackathon</a>
    `;
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: 'brainet_user_link@outlook.com',
                pass: 'Brainetlozinka'
            }
        });
        const mailOptions = {
            from: 'brainet_user_link@outlook.com',
            to: user.name,
            subject: 'test mail',
            html: html,
        };
        yield transporter.sendMail(mailOptions);
        res.status(201).send();
    }
    catch (_a) {
        res.status(500).send();
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userHashed = users.find((user) => user.name === req.body.name);
    if (!userHashed) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (yield bcrypt_1.default.compare(req.body.password, userHashed.password)) {
            const user = { username: req.body.name, password: req.body.password };
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
            res.json({ accessToken: accessToken });
        }
        else {
            res.send('Not Allowed');
        }
    }
    catch (_b) {
        res.status(500).send();
    }
}));
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        if (err)
            return res.sendStatus(403);
        req.body.user = user;
        console.log(user);
        next();
    });
}
const generateRandomString = (length) => {
    return crypto_1.default.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};
exports.generateRandomString = generateRandomString;

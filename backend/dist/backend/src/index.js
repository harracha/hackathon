"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./domain/User/router/index"));
const index_2 = __importDefault(require("./domain/Device/router/index"));
const index_3 = __importDefault(require("./domain/Connection/router/index"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./auth/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
app.use("/user", index_1.default);
app.use("/device", index_2.default);
app.use("/connection", index_3.default);
app.get("/", (req, res) => {
    res.redirect("/auth");
});
app.use("/auth", auth_1.auth);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

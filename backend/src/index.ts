import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import user from "./domain/User/router/index";
import device from "./domain/Device/router/index"
import cors from "cors";
import { auth } from './auth/auth'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: "http://localhost:3000"
}))

app.use("/user", user);
app.use("/device", device)

app.get("/", (req: Request, res: Response) => {
  res.redirect('/auth');
});

app.use('/auth', auth);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

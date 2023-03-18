import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import user from "./domain/User/router/index";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: "http://localhost:3000"
}))

app.use("/user", user);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript picka");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

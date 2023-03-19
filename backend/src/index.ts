import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import user from "./domain/User/userRouter/index";
import device from "./domain/Device/router/index";
import connection from "./domain/Connection/router/index";
import cors from "cors";
import { auth } from "./auth/auth";
import cookieParser from "cookie-parser";
import { createContext } from "./controllers/trpc";
import appRouter from "./controllers/router";
import * as trpcExpress from "@trpc/server/adapters/express";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  console.log("");
  console.log("⬅️ ", req.method, req.path);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(cookieParser());

app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// app.get("/", (req: Request, res: Response) => {
//   res.redirect("/auth");
// });

app.use("/auth", auth);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export type AppRouter = typeof appRouter;

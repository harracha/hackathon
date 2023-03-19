// import express from "express";
// const router = express.Router();
// import { Request, Response } from "express";
// import createUserInteractor from "../interactors/createUserInteractor";
// import getUserByIdInteractor from "../interactors/getUserByIdInteractor";
// import listUsersInteractor from "../interactors/listUsersInteractor";
// import { UserEntity } from "../model/UserEntity";
// import { UserRepository } from "../repo/UserRepository";
// import UserRepositoryPrisma from "../repo/UserRepositoryPrisma";
// import parser from "body-parser";
// import { updateUserEntity } from "../model/updateUserEntity";
// import updateUserInteractor from "../interactors/updateUserInteractor";
// import deleteUserInteractor from "../interactors/deleteUserInteractor";
// import archiveUserInteractor from "../interactors/archiveUserInteractor";
// import approveUserInteractor from "../interactors/approveUserInteractor";
// import giveAdminInteractor from "../interactors/giveAdminInteractor";
// import { PrismaClient } from "@prisma/client";
// import { userLogin } from "../model/userLogin";
// import dotenv from "dotenv";
// import checkVercodeInteractor from "../interactors/checkVercodeInteractor";
// import { generateRandomString } from "../../../auth/auth";
// import bcrypt from "bcrypt";
// import nodemailer from "nodemailer";
// import listAllFlaggedInteractor from "../interactors/listAllFlaggedInteractor";
// import ReqRepositoryPrisma from "../../Req/repo/ReqRepositoryPrisma";
// import { ReqRepository } from "../../Req/repo/ReqRepository";
// import { ReqEntity } from "../../Req/model/ReqEntity";
// import { ResEntity } from "../../Res/model/ResEntity";

// const prisma = new PrismaClient();
// const repo: UserRepository = new UserRepositoryPrisma();
// const jwt = require("jsonwebtoken");
// const reqRepo: ReqRepository = new ReqRepositoryPrisma();

// // middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });
// var jsonParser = parser.json();
// dotenv.config();

// router.get("/", async (req, res) => {
//   let data: UserEntity[] = await listUsersInteractor(repo);
//   res.status(200).json(data);
// });

// router.get("/:id", async (req, res) => {
//   let data: UserEntity | null = await getUserByIdInteractor(
//     repo,
//     req.params.id
//   );
//   res.status(200).json(data);
// });

// router.post("/create", jsonParser, async (req, res) => {
//   const verCode = generateRandomString(16);
//   let user: UserEntity = {
//     ...(await req.body),
//     password: await bcrypt.hash(req.body.password, 10),
//     verCode: verCode,
//   };
//   let data: UserEntity = await createUserInteractor(repo, user);

//   const str = "http://localhost:4000/user/verCode/" + user.id + "/" + verCode;
//   const html =
//     `<h1>HŽV</h1>
//       <p>za verifikaciju stisni na link</p>
//       <a href="` +
//     str +
//     `">dobar dan na hackathon</a>
//     `;

//   const transporter = nodemailer.createTransport({
//     host: "smtp.office365.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "brainet_user_link@outlook.com",
//       pass: "Brainetlozinka",
//     },
//   });

//   const mailOptions = {
//     from: "brainet_user_link@outlook.com",
//     to: user.email,
//     subject: "Verification",
//     html: html,
//   };

//   await transporter.sendMail(mailOptions);

//   res.status(200).json(data);
// });

// router.patch("/update/:id", jsonParser, async (req, res) => {
//   let body: updateUserEntity = await req.body;
//   let user: updateUserEntity = { ...body, id: req.params.id };
//   let data: UserEntity = await updateUserInteractor(repo, user);
//   res.status(200).json(data);
// });

// router.patch("/archive/:id", jsonParser, async (req, res) => {
//   let userId = req.params.id;
//   let data: UserEntity | null = await archiveUserInteractor(repo, userId);
//   res.status(200).json(data);
// });

// router.patch("/admin/approve/:id", jsonParser, async (req, res) => {
//   let userId = req.params.id;
//   let data: UserEntity | null = await approveUserInteractor(repo, userId);
//   res.status(200).json(data);
// });

// router.patch("/admin/giveAdmin/:id", jsonParser, async (req, res) => {
//   let userId = req.params.id;
//   let data: UserEntity | null = await giveAdminInteractor(repo, userId);
//   res.status(200).json(data);
// });

// router.delete("/delete/:id", jsonParser, async (req, res) => {
//   let userId = req.params.id;
//   let data: UserEntity | null = await deleteUserInteractor(repo, userId);
//   res.status(200).json(data);
// });

// router.post("/login", async (req: Request, res: Response) => {
//   //const userHashed = users.find((user) => user.name === req.body.name);
//   // if (!userHashed) {
//   //   return res.status(400).send('Cannot find user');
//   // }

//   try {
//     let body = await req.body;
//     let user: userLogin | null = await prisma.user.findUnique({
//       where: {
//         email: body.username,
//       },
//       select: {
//         email: true,
//         password: true,
//         userRole: true,
//       },
//     });
//     let tokenizedUser = {
//       email: user?.email,
//       password: user?.password,
//       userRole: user?.userRole,
//     };
//     //if (await bcrypt.compare(req.body.password, userHashed.password)) {
//     //const user = { username : req.body.name, password : req.body.password};
//     const accessToken = jwt.sign(
//       tokenizedUser,
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "30m" }
//     );
//     res.json({ accessToken: accessToken });
//     /* } else {
//       res.send('Not Allowed');
//     } */
//   } catch {
//     res.status(500).send();
//   }
// });

// router.get("/verCode/:userId/:verCode", async (req, res) => {
//   let data: boolean = await checkVercodeInteractor(
//     repo,
//     req.params.userId,
//     req.params.verCode
//   );
//   if (data) {
//     res.redirect("/user/login");
//   } else res.status(403);
// });

// router.get("/admin/flagged", async (req, res) => {
//   let data: ReqEntity[] = await listAllFlaggedInteractor(reqRepo);
//   res.status(200).json(data);
// });

// export default router;

import { z } from "zod";
import {
  adminProcedure,
  publicProcedure,
} from "../../../controllers/middleware/auth";
import { t } from "../../../controllers/trpc";
import { ReqEntity } from "../../Req/model/ReqEntity";
import ReqRepositoryPrisma from "../../Req/repo/ReqRepositoryPrisma";
import createUserInteractor from "../interactors/createUserInteractor";
import deleteUserInteractor from "../interactors/deleteUserInteractor";
import getUserByIdInteractor from "../interactors/getUserByEmailInteractor";
import giveAdminInteractor from "../interactors/giveAdminInteractor";
import listAllFlaggedInteractor from "../interactors/listAllFlaggedInteractor";
import listUsersInteractor from "../interactors/listUsersInteractor";
import updateUserInteractor from "../interactors/updateUserInteractor";
import { updateUserEntity } from "../model/updateUserEntity";
import { UserEntity } from "../model/UserEntity";
import UserRepositoryPrisma from "../repo/UserRepositoryPrisma";

let repo = new UserRepositoryPrisma();
let reqRepo = new ReqRepositoryPrisma();

export default t.router({
  createUser: adminProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        userRole: z.enum(["DEFAULT", "ADMIN"]),
        userStatus: z.enum(["ACTIVE", "ARCHIVED", "PENDING"]),
        username: z.string(),
        info: z.null(),
        keywords: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      let user: UserEntity = {
        ...input,
        id: "",
      };
      let newUser = await createUserInteractor(repo, user);
      return newUser;
    }),

  deleteUserById: adminProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      let a = await deleteUserInteractor(repo, input);
      return a;
    }),

  getUserById: publicProcedure.input(z.string()).query(async ({ input }) => {
    let user = await getUserByIdInteractor(repo, input);
    return user;
  }),

  listUsers: publicProcedure.query(async () => {
    let users = await listUsersInteractor(repo);
    return users as UserEntity[];
  }),

  updateUserById: publicProcedure

    .input(
      z.object({
        id: z.string(),
        email: z.string().optional(),
        password: z.string().optional(),
        userRole: z.enum(["DEFAULT", "ADMIN"]).optional(),
        userStatus: z.enum(["ACTIVE", "ARCHIVED", "PENDING"]).optional(),
        username: z.string().optional(),
        info: z.null(),
        keywords: z.array(z.string()).optional(),
        avatar: z.string().optional(),
        googleUserId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      let user: updateUserEntity = { ...input };
      let updatedUser = await updateUserInteractor(repo, user);
      return updatedUser;
    }),

  giveAdmin: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    let userId: string = input;
    let updatedUser = await giveAdminInteractor(repo, userId);
    return updatedUser;
  }),

  listFlagged: adminProcedure.query(async () => {
    let users = await listAllFlaggedInteractor(reqRepo);
    return users as ReqEntity[];
  }),
});

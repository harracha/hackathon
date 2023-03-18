import express from "express";
const router = express.Router();
import { Request, Response } from "express";
import createUserInteractor from "../interactors/createUserInteractor";
import getUserByIdInteractor from "../interactors/getUserByIdInteractor";
import listUsersInteractor from "../interactors/listUsersInteractor";
import { UserEntity } from "../model/UserEntity";
import { UserRepository } from "../repo/UserRepository";
import UserRepositoryPrisma from "../repo/UserRepositoryPrisma";
import parser from "body-parser";
import { updateUserEntity } from "../model/updateUserEntity";
import updateUserInteractor from "../interactors/updateUserInteractor";
import deleteUserInteractor from "../interactors/deleteUserInteractor";
import archiveUserInteractor from "../interactors/archiveUserInteractor";
import approveUserInteractor from "../interactors/approveUserInteractor";
import giveAdminInteractor from "../interactors/giveAdminInteractor";
import { PrismaClient } from "@prisma/client";
import { userLogin } from "../model/userLogin";
import dotenv from 'dotenv'

const prisma = new PrismaClient();
const repo: UserRepository = new UserRepositoryPrisma();
const jwt = require('jsonwebtoken')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
var jsonParser = parser.json();
dotenv.config()

router.get("/", async (req, res) => {
  let data: UserEntity[] = await listUsersInteractor(repo);
  res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
  let data: UserEntity | null = await getUserByIdInteractor(
    repo,
    req.params.id
  );
  res.status(200).json(data);
});

router.post("/create", jsonParser, async (req, res) => {
  let user: UserEntity = await req.body;
  let data: UserEntity = await createUserInteractor(repo, user);
  res.status(200).json(data);
});

router.patch("/update/:id", jsonParser, async (req, res) => {
  let body: updateUserEntity = await req.body;
  let user: updateUserEntity = { ...body, id: req.params.id };
  let data: UserEntity = await updateUserInteractor(repo, user);
  res.status(200).json(data);
});

router.patch("/archive/:id", jsonParser, async (req, res) => {
  let userId = req.params.id;
  let data: UserEntity | null = await archiveUserInteractor(repo, userId);
  res.status(200).json(data);
});

router.patch("/admin/approve/:id", jsonParser, async (req, res) => {
  let userId = req.params.id;
  let data: UserEntity | null = await approveUserInteractor(repo, userId);
  res.status(200).json(data);
});

router.patch("/admin/giveAdmin/:id", jsonParser, async (req, res) => {
  let userId = req.params.id;
  let data: UserEntity | null = await giveAdminInteractor(repo, userId);
  res.status(200).json(data);
});

router.delete("/delete/:id", jsonParser, async (req, res) => {
  let userId = req.params.id;
  let data: UserEntity | null = await deleteUserInteractor(repo, userId);
  res.status(200).json(data);
});

router.post('/login', async (req: Request, res: Response) => {
  //const userHashed = users.find((user) => user.name === req.body.name);
  // if (!userHashed) {
  //   return res.status(400).send('Cannot find user');
  // }
  
  try {
    let body = await req.body;
    let user : userLogin | null = await prisma.user.findUnique({
      where: {
        email: body.username
      },
      select: {
        email: true, 
        password: true,
        userRole: true
      }
    })
    let tokenizedUser = {
      email: user?.email,
      password: user?.password,
      userRole: user?.userRole

    }
    //if (await bcrypt.compare(req.body.password, userHashed.password)) {
      //const user = { username : req.body.name, password : req.body.password};
      const accessToken = jwt.sign(tokenizedUser, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '30m'});
      res.json({ accessToken : accessToken});
    /* } else {
      res.send('Not Allowed');
    } */
  } catch {
    res.status(500).send();
  }
});

export default router;

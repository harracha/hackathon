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
import checkVercodeInteractor from "../interactors/checkVercodeInteractor";

const repo: UserRepository = new UserRepositoryPrisma();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
var jsonParser = parser.json();

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

router.get("/user/verCode/:userId/:verCode", async (req, res) => {
  let data: boolean = await checkVercodeInteractor(
    repo,
    req.params.userId,
    req.params.verCode
  );
  res.status(200).json(data);
});

export default router;

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

// define the about route
router.get("/about", (req, res) => {
  res.send("About birds");
});

export default router;

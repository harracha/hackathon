import express from "express";
const router = express.Router();
import { Request, Response } from "express";
import createConnectionInteractor from "../interactors/createConnectionInteractor";
import getConnectionByIdInteractor from "../interactors/getConnectionByIdInteractor";
import listConnectionsInteractor from "../interactors/listConnectionsInteractor";
import { ConnectionEntity } from "../model/ConnectionEntity";
import { ConnectionRepository } from "../repo/ConnectionRepository";
import ConnectionRepositoryPrisma from "../repo/ConnectionRepositoryPrisma";
import parser from "body-parser";
import { updateConnectionEntity } from "../model/updateConnectionEntity";
import updateConnectionInteractor from "../interactors/updateConnectionInteractor";
import deleteConnectionInteractor from "../interactors/deleteConnectionInteractor";
import archiveConnectionInteractor from "../interactors/archiveConnectionInteractor";

const repo: ConnectionRepository = new ConnectionRepositoryPrisma();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
var jsonParser = parser.json();

router.get("/", async (req, res) => {
  let data: ConnectionEntity[] = await listConnectionsInteractor(repo);
  res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
  let data: ConnectionEntity | null = await getConnectionByIdInteractor(
    repo,
    req.params.id
  );
  res.status(200).json(data);
});

router.post("/create", jsonParser, async (req, res) => {
  let connection: ConnectionEntity = await req.body;
  let data: ConnectionEntity = await createConnectionInteractor(
    repo,
    connection
  );
  res.status(200).json(data);
});

router.patch("/update/:id", jsonParser, async (req, res) => {
  let body: updateConnectionEntity = await req.body;
  let connection: updateConnectionEntity = { ...body, id: req.params.id };
  let data: ConnectionEntity = await updateConnectionInteractor(
    repo,
    connection
  );
  res.status(200).json(data);
});

router.patch("/archive/:id", jsonParser, async (req, res) => {
  let connectionId = req.params.id;
  let data: ConnectionEntity | null = await archiveConnectionInteractor(
    repo,
    connectionId
  );
  res.status(200).json(data);
});

router.delete("/delete/:id", jsonParser, async (req, res) => {
  let connectionId = req.params.id;
  let data: ConnectionEntity | null = await deleteConnectionInteractor(
    repo,
    connectionId
  );
  res.status(200).json(data);
});

export default router;
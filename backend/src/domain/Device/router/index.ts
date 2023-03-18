import express from "express";
const router = express.Router();
import { Request, Response } from "express";
import parser from "body-parser";

import DeviceRepositoryPrisma from "../repo/DeviceRepositoryPrisma";
import { DeviceRepository } from "../repo/DeviceRepository";
import { DeviceEntity } from "../model/deviceModel";
import listDevicesInteractor from "../interactors/listDevicesInteractor";
import getDeviceByIdInteractor from "../interactors/getDeviceByIdInteractor";
import updateDeviceInteractor from "../interactors/updateDeviceInteractor";
import { updateDeviceEntity } from "../model/updateDeviceModel";
import deleteDeviceInteractor from "../interactors/deleteDeviceInteractor";

const repo: DeviceRepository = new DeviceRepositoryPrisma();

router.use((req, res, next) => {
  console.log(req.method);
  console.log("Time: ", Date.now());
  next();
});
var jsonParser = parser.json();

router.get("/", async (req, res) => {
  let data: DeviceEntity[] = await listDevicesInteractor(repo);
  res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
  let deviceId = req.params.id;
  let data: DeviceEntity | null = await getDeviceByIdInteractor(repo, deviceId);
  res.status(200).json(data);
});

router.patch("/update/:id", async (req, res) => {
  let deviceId = req.params.id;
  let body = await req.body;
  let updateData: updateDeviceEntity = { ...body, id: deviceId };
  let data: DeviceEntity = await updateDeviceInteractor(repo, updateData);
  res.status(200).json(data);
});

router.delete("/delete/:id", async (req, res) => {
  let deviceId = req.params.id;
  let deletedDevice: DeviceEntity = await deleteDeviceInteractor(
    repo,
    deviceId
  );
  res.status(200).json(deletedDevice);
});

export default router;

import { Device, PrismaClient } from "@prisma/client";
import { DeviceEntity } from "../model/deviceModel";
import { updateDeviceEntity } from "../model/updateDeviceModel";
import { DeviceRepository } from "./DeviceRepository";

const prisma = new PrismaClient();

export default class DeviceRepositoryPrisma extends DeviceRepository {
  async getAll() {
    let datas = await prisma.device.findMany();

    // map to UserEntities
    let devices: DeviceEntity[] = [];
    datas.forEach((data: Device) => {
      let device: DeviceEntity = data;
      devices.push(device);
    });

    return devices;
  }

  async getById(id: string) {
    let response = await prisma.device.findUnique({
      where: {
        id: id,
      },
    });
    if (response) {
      let device: DeviceEntity = response;
      return device;
    } else {
      return null;
    }
  }

  async update(data: updateDeviceEntity) {
    let response = await prisma.device.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        status: data.status,
      },
    });

    let updatedDevice: DeviceEntity = response;
    return updatedDevice;
  }

  async create(data: DeviceEntity) {
    let response = await prisma.device.create({
      data: {
        name: "Tablet",
        userId: "f7536653-e120-405c-8b41-34314a358565",
        status: "ONLINE",
        keywords: [
          "hotbabes.com",
          "Nigerijski Princ",
          "Srbi za humanost",
          "napaljene zene u blizini",
        ],
      },
    });

    let updatedDevice: DeviceEntity = response;
    return updatedDevice;
  }

  async delete(id: string) {
    let response = await prisma.device.delete({
      where: {
        id: id,
      },
    });
    let deletedDevice: DeviceEntity = response;
    return deletedDevice;
  }
  async quarantine(id: string, reqId: string) {
    let device = await prisma.device.findUnique({
      where: {
        id: id,
      },
    });
    let q = device?.quarantine;
    q?.push(reqId);
    let response = await prisma.device.update({
      where: {
        id: id,
      },
      data: {
        quarantine: q,
      },
    });
    if (response) {
      return "success";
    } else {
      return "failure";
    }
  }
}

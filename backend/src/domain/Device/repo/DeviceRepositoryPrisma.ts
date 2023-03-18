import { Device, PrismaClient } from "@prisma/client";
import { DeviceEntity } from "../model/deviceModel";
import { updateDeviceEntity } from "../model/updateDeviceModel";
import { DeviceRepository } from "./DeviceRepository";

const prisma = new PrismaClient()

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
                id:id
            }
        });
        if(response) {
            let device: DeviceEntity = response;
            return device
        }
        else { 
            return null;
        }
        
        
    }

    async update(data: updateDeviceEntity) {
        let response = await prisma.device.update({
            where:{
                id: data.id
            },
            data: {
                name: data.name,
                status: data.status
            }
        });

        let updatedDevice: DeviceEntity = response;
        return updatedDevice
    }

    async delete(id:string) { 
        let response = await prisma.device.delete({
            where: {
                id:id
            }
        });
        let deletedDevice: DeviceEntity = response; 
        return deletedDevice;
    }
}
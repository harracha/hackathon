import { DeviceEntity } from "../model/deviceModel";
import { updateDeviceEntity } from "../model/updateDeviceModel";

export abstract class DeviceRepository {
  async getAll(): Promise<DeviceEntity[]> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<DeviceEntity | null> {
    throw new Error("Method not implemented.");
  }
  async update(data: updateDeviceEntity): Promise<DeviceEntity> {
    throw new Error("Method not implemented.");
  }
  async create(data: DeviceEntity): Promise<DeviceEntity> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<DeviceEntity> {
    throw new Error("Method not implemented.");
  }
  async quarantine(id: string, reqId: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}

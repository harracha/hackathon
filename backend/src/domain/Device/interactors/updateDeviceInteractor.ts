import { updateDeviceEntity } from "../model/updateDeviceModel";
import { DeviceRepository } from "../repo/DeviceRepository";

export default async function updateDeviceInteractor(
  deviceRepository: DeviceRepository,
  data: updateDeviceEntity
) {
  let device = await deviceRepository.update(data);
  return device;
}

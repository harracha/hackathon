import { DeviceRepository } from "../repo/DeviceRepository";

export default async function getDeviceByIdInteractor(
  deviceRepository: DeviceRepository,
  id: string
) {
  let device = await deviceRepository.getById(id);
  return device;
}

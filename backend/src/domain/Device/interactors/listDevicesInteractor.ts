import { DeviceRepository } from "../repo/DeviceRepository";

export default async function listDevicesInteractor(deviceRepository: DeviceRepository) {
    let response = await deviceRepository.getAll();
    return response;
}
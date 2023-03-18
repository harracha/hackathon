import { DeviceRepository } from "../repo/DeviceRepository";

export default async function deleteDeviceInteractor(
    deviceRepository: DeviceRepository,
    id: string
) {
    let response = await deviceRepository.delete(id);
    return response;
}
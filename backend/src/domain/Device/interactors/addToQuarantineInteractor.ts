import { ReqRepository } from "../../Req/repo/ReqRepository";
import { DeviceRepository } from "../repo/DeviceRepository";

export default async function scanInteractor(
  deviceRepository: DeviceRepository,
  id: string,
  reqId: string
) {
  let response = await deviceRepository.quarantine(id, reqId);
  return response;
}

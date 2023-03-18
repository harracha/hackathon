import { ReqRepository } from "../../Req/repo/ReqRepository";
import { UserRepository } from "../repo/UserRepository";

export default async function listFlaggedByDeviceIdInteractor(
  reqRepository: ReqRepository,
  deviceId: string
) {
  let users = await reqRepository.getFlaggedByDeviceId(deviceId);
  return users;
}

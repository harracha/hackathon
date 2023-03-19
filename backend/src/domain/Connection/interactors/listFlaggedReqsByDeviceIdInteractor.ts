import { ReqRepository } from "../../Req/repo/ReqRepository";
import { ConnectionRepository } from "../repo/ConnectionRepository";

export default async function listFlaggedReqsByDeviceIdInteractor(
  reqRepository: ReqRepository,
  id: string
) {
  let connections = await reqRepository.getFlaggedByDeviceId(id);
  return connections;
}

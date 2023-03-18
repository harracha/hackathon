import { ReqRepository } from "../../Req/repo/ReqRepository";
import { ConnectionRepository } from "../repo/ConnectionRepository";

export default async function listReqsInConnectionInteractor(
  reqRepository: ReqRepository,
  id: string
) {
  let connections = await reqRepository.getAllByConnectionId(id);
  return connections;
}

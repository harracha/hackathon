import { ReqRepository } from "../../Req/repo/ReqRepository";
import { ConnectionRepository } from "../repo/ConnectionRepository";

export default async function getReqInteractor(
  reqRepository: ReqRepository,
  id: string
) {
  let connection = await reqRepository.getById(id);
  return connection;
}

import { ReqEntity } from "../../Req/model/ReqEntity";
import { ReqRepository } from "../../Req/repo/ReqRepository";
import { ConnectionEntity } from "../model/ConnectionEntity";
import { ConnectionRepository } from "../repo/ConnectionRepository";

export default async function createReqInteractor(
  reqRepository: ReqRepository,
  req: ReqEntity
) {
  let connections = await reqRepository.create(req);
  return connections;
}

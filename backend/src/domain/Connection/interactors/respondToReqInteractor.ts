import { ReqRepository } from "../../Req/repo/ReqRepository";
import { ResEntity } from "../../Res/model/ResEntity";
import { ConnectionRepository } from "../repo/ConnectionRepository";

export default async function respondToReqInteractor(
  reqRepository: ReqRepository,
  id: string,
  res: ResEntity
) {
  let connection = await reqRepository.respond(id, res);
  return connection;
}

import { ReqRepository } from "../../Req/repo/ReqRepository";
import { ResEntity } from "../../Res/model/ResEntity";
import { updateUserEntity } from "../model/updateUserEntity";
import { UserEntity } from "../model/UserEntity";
import { UserRepository } from "../repo/UserRepository";

export default async function respondToReqInteractor(
  reqRepository: ReqRepository,
  id: string,
  res: ResEntity
) {
  let users = await reqRepository.respond(id, res);
  return users;
}

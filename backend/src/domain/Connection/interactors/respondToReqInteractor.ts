import { ReqRepository } from "../../Req/repo/ReqRepository";
import { ResEntity } from "../../Res/model/ResEntity";
import { updateUserEntity } from "../../User/model/updateUserEntity";
import { UserEntity } from "../../User/model/UserEntity";
import { UserRepository } from "../../User/repo/UserRepository";

export default async function respondToReqInteractor(
  reqRepository: ReqRepository,
  id: string,
  res: ResEntity
) {
  let users = await reqRepository.respond(id, res);
  return users;
}

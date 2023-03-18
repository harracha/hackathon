import { ReqRepository } from "../../Req/repo/ReqRepository";
import { updateUserEntity } from "../model/updateUserEntity";
import { UserEntity } from "../model/UserEntity";
import { UserRepository } from "../repo/UserRepository";

export default async function flagReqInteractor(
  reqRepository: ReqRepository,
  id: string
) {
  let users = await reqRepository.flag(id);
  return users;
}

import { ReqRepository } from "../../Req/repo/ReqRepository";
import { updateUserEntity } from "../../User/model/updateUserEntity";
import { UserEntity } from "../../User/model/UserEntity";
import { UserRepository } from "../../User/repo/UserRepository";

export default async function flagReqInteractor(
  reqRepository: ReqRepository,
  id: string
) {
  let users = await reqRepository.flag(id);
  return users;
}

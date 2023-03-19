import { ReqRepository } from "../../Req/repo/ReqRepository";

export default async function flagReqInteractor(
  reqRepository: ReqRepository,
  id: string
) {
  let users = await reqRepository.flag(id);
  return users;
}

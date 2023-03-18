import { ReqRepository } from "../../Req/repo/ReqRepository";
import { UserRepository } from "../repo/UserRepository";

export default async function listAllFlaggedInteractor(
  reqRepository: ReqRepository
) {
  let users = await reqRepository.getFlagged();
  return users;
}

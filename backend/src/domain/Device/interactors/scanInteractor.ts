import { ReqRepository } from "../../Req/repo/ReqRepository";

export default async function scanInteractor(
  reqRepository: ReqRepository,
  id: string
) {
  let response = await reqRepository.scan(id);
  return response;
}

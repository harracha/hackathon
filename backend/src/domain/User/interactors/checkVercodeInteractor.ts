import { UserRepository } from "../repo/UserRepository";

export default async function checkVercodeInteractor(
  userRepository: UserRepository,
  id: string,
  vercode: string
) {
  let user = await userRepository.checkVercode(id, vercode);
  return user;
}

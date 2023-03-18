import { UserRepository } from "../repo/UserRepository";

export default async function archiveUserInteractor(
  userRepository: UserRepository,
  id: string
) {
  let user = await userRepository.archive(id);
  return user;
}

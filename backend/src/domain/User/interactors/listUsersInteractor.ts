import { UserRepository } from "../repo/UserRepository";

export default async function listUsersInteractor(
  userRepository: UserRepository
) {
  let users = await userRepository.getAll();
  return users;
}

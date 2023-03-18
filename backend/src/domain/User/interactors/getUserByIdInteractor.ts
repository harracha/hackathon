import { UserRepository } from "../repo/UserRepository";

export default async function getUserByIdInteractor(
  userRepository: UserRepository,
  id: string
) {
  let user = await userRepository.getById(id);
  return user;
}

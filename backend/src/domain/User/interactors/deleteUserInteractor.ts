import { UserRepository } from "../repo/UserRepository";

export default async function deleteUserInteractor(
  userRepository: UserRepository,
  id: string
) {
  let user = await userRepository.delete(id);
  return user;
}

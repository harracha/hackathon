import { UserRepository } from "../repo/UserRepository";

export default async function getUserByIdInteractor(
  userRepository: UserRepository,
  email: string
) {
  let user = await userRepository.getByEmail(email);
  return user;
}

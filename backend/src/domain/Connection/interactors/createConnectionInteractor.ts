import { UserEntity } from "../model/UserEntity";
import { UserRepository } from "../repo/UserRepository";

export default async function createUserInteractor(
  userRepository: UserRepository,
  user: UserEntity
) {
  console.log(user.id);
  let users = await userRepository.create(user);
  return users;
}

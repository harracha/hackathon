import { updateUserEntity } from "../model/updateUserEntity";
import { UserEntity } from "../model/UserEntity";
import { UserRepository } from "../repo/UserRepository";

export default async function createUserInteractor(
  userRepository: UserRepository,
  data: updateUserEntity
) {

  let users = await userRepository.update(data);
  return users;
}

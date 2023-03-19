import { UserRepository } from "../repo/UserRepository";

export default async function approveUserInteractor(
  userRepository: UserRepository,
  id: string
) {
  //TREBA NAPRAVITI PROVJERU STATUSA USERA KOJI POZIVA OVAJ INTERACTOR
  //PREKO JWT-A

  let user = await userRepository.approve(id);
  return user;
}

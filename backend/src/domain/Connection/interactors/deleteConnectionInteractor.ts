import { ConnectionRepository } from "../repo/ConnectionRepository";

export default async function deleteConnectionInteractor(
  connectionRepository: ConnectionRepository,
  id: string
) {
  let connection = await connectionRepository.delete(id);
  return connection;
}

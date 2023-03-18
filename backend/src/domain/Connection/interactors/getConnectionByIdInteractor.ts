import { ConnectionRepository } from "../repo/ConnectionRepository";

export default async function getConnectionByIdInteractor(
  connectionRepository: ConnectionRepository,
  id: string
) {
  let connection = await connectionRepository.getById(id);
  return connection;
}

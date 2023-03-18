import { ConnectionRepository } from "../repo/ConnectionRepository";

export default async function listConnectionsInteractor(
  connectionRepository: ConnectionRepository
) {
  let connections = await connectionRepository.getAll();
  return connections;
}

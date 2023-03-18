import { ConnectionEntity } from "../model/ConnectionEntity";
import { ConnectionRepository } from "../repo/ConnectionRepository";

export default async function createConnectionInteractor(
  connectionRepository: ConnectionRepository,
  connection: ConnectionEntity
) {
  console.log(connection.id);
  let connections = await connectionRepository.create(connection);
  return connections;
}

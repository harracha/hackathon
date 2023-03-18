import { updateConnectionEntity } from "../model/updateConnectionEntity";
import { ConnectionRepository } from "../repo/ConnectionRepository";

export default async function updateConnectionInteractor(
  connectionRepository: ConnectionRepository,
  data: updateConnectionEntity
) {
  let connections = await connectionRepository.update(data);
  return connections;
}

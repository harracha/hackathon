import { ConnectionRepository } from "../repo/ConnectionRepository";

export default async function archiveConnectionInteractor(
  connectionRepository: ConnectionRepository,
  id: string
) {
  let connection = await connectionRepository.archive(id);
  return connection;
}

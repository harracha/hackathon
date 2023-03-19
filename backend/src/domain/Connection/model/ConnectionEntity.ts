import { ConnectionStatus } from "@prisma/client";

export type ConnectionEntity = {
  id: string;
  connectionStatus: ConnectionStatus;
};

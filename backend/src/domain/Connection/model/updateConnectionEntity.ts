import { ConnectionStatus } from "@prisma/client";

export type updateConnectionEntity = {
  id: string;
  connectionStatus?: ConnectionStatus;
};

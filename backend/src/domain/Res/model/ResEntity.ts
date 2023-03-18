import { Connection, HTTPMethods, Res } from "@prisma/client";

export type ResEntity = {
  id: string;
  code: string;
  connectionId: string;
  reqId: string;
};

import { Connection, HTTPMethods, Res } from "@prisma/client";

export type ReqEntity = {
  id: string;
  httpVersion: string;
  httpMethod: HTTPMethods;
  body: string;
  isThreat: boolean;
  connectionId: string;
  threat: string | null;
  deviceId: string | null;
};

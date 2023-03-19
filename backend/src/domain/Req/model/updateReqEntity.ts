import { HTTPMethods } from "@prisma/client";

export type updateReqEntity = {
  id: string;
  httpVersion?: string;
  httpMethod?: HTTPMethods;
  body?: string;
  isThreat?: boolean;
  connectionId?: string;
  threat?: string | null;
  deviceId?: string | null;
};

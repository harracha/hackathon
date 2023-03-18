import { HTTPMethods } from "@prisma/client";

export type updateReqEntity = {
  id: string;
  httpVersion?: string;
  httpMethod?: HTTPMethods;
  body?: string;
  isThreat?: string;
  threat?: string;
};

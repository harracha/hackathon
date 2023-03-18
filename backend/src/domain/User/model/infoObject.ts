import { Prisma } from "@prisma/client";

export declare type infoObject =
  | Prisma.JsonObject
  | Prisma.JsonValue
  | null
  | number
  | string
  | boolean;

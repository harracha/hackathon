import { DeviceStatus } from "@prisma/client";

export type DeviceEntity = {
  id: string;
  name: string;
  userId: string;
  status: DeviceStatus;
  keywords: string[];
  quarantine: string[];
};

import { Device, UserRole } from "@prisma/client";
import { userInfo } from "./userInfo";

export type updateUserEntity = {
  id: string;
  email?: string;
  info?: userInfo;
  password?: string;
  userRole?: UserRole;
  avatar?: string;
  googleUserId?: string;
  devices?: Device[];
};

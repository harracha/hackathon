import { Device, UserRole, UserStatus } from "@prisma/client";
import { userInfo } from "./userInfo";

export type updateUserEntity = {
  id: string;
  email?: string;
  username?: string;
  info?: userInfo;
  password?: string;
  userRole?: UserRole;
  avatar?: string;
  googleUserId?: string;
  devices?: Device[];
  userStatus?: UserStatus;
  keywords?: string[];
};

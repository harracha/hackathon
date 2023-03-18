import { Device, UserRole } from "@prisma/client";
import { infoObject } from "./infoObject";
import { userInfo } from "./userInfo";

export type UserEntity = {
  id: string;
  email: string;
  info: infoObject;
  password: string;
  userRole: UserRole;
  avatar?: string | null;
  googleUserId?: string | null;
  devices?: Device[];
};

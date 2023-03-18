import { Device, UserRole, UserStatus } from "@prisma/client";
import { userInfo } from "./userInfo";

export type UserEntity = {
  id: string;
  email: string;
  username: string;
  info: userInfo;
  password: string;
  userRole: UserRole;
  avatar?: string | null;
  googleUserId?: string | null;
  devices?: Device[];
  userStatus: UserStatus;
  keywords: string[];
};



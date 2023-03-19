import { UserRole } from "@prisma/client";

export type userLogin = {
    email: string;
    password: string;
    userRole: UserRole
}
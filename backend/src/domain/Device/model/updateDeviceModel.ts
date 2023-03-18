import { DeviceStatus } from "@prisma/client";

export type updateDeviceEntity = {
    id: string;
    name?: string;
    //userId?: string; zakomentirano jer je ovo foreign key i ne bi se trebalo mijenjati 
    status?: DeviceStatus
}
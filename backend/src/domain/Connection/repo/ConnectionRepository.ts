import { Prisma } from "@prisma/client";
import { updateConnectionEntity } from "../model/updateConnectionEntity";
import { ConnectionEntity } from "../model/ConnectionEntity";

export abstract class ConnectionRepository {
  async getAll(): Promise<ConnectionEntity[]> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<
    | (ConnectionEntity & {
        device: DeviceEntity[];
        req: ReqEntity[];
        res: ResEntity[];
      })
    | null
  > {
    throw new Error("Method not implemented.");
  }
  async create(connection: ConnectionEntity): Promise<ConnectionEntity> {
    throw new Error("Method not implemented.");
  }
  async update(connection: updateConnectionEntity): Promise<ConnectionEntity> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<ConnectionEntity | null> {
    throw new Error("Method not implemented.");
  }
  async archive(id: string): Promise<ConnectionEntity | null> {
    throw new Error("Method not implemented.");
  }
}

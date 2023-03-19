import { Prisma } from "@prisma/client";
import { updateReqEntity } from "../model/updateReqEntity";
import { ReqEntity } from "../model/ReqEntity";
import { ResEntity } from "../../Res/model/ResEntity";

export abstract class ReqRepository {
  async getAll(): Promise<(ReqEntity & { res: ResEntity | null })[]> {
    throw new Error("Method not implemented.");
  }
  async getFlagged(): Promise<ReqEntity[]> {
    throw new Error("Method not implemented.");
  }
  async getFlaggedByDeviceId(deviceId: string): Promise<ReqEntity[]> {
    throw new Error("Method not implemented.");
  }
  async getAllByConnectionId(
    connectionId: string
  ): Promise<(ReqEntity & { res: ResEntity | null })[]> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<
    | (ReqEntity & {
        res: ResEntity | null;
      })
    | null
  > {
    throw new Error("Method not implemented.");
  }
  async create(req: ReqEntity): Promise<ReqEntity> {
    throw new Error("Method not implemented.");
  }
  async update(req: updateReqEntity): Promise<ReqEntity> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<ReqEntity | null> {
    throw new Error("Method not implemented.");
  }
  async respond(id: string, res: ResEntity): Promise<ResEntity | null> {
    throw new Error("Method not implemented.");
  }
  async flag(id: string): Promise<ReqEntity | null> {
    throw new Error("Method not implemented.");
  }
  async scan(id: string): Promise<ReqEntity[] | null> {
    throw new Error("Method not implemented.");
  }
}

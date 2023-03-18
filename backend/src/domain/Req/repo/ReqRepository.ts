import { Prisma } from "@prisma/client";
import { updateReqEntity } from "../model/updateReqEntity";
import { ReqEntity } from "../model/ReqEntity";

export abstract class ReqRepository {
  async getAll(): Promise<ReqEntity[]> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<
    | (ReqEntity & {
        res: ResEntity[];
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
  async archive(id: string): Promise<ReqEntity | null> {
    throw new Error("Method not implemented.");
  }
}

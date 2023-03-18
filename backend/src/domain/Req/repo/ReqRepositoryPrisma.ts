import { Prisma, PrismaClient, Req, Res } from "@prisma/client";
import { updateReqEntity } from "../model/updateReqEntity";
import { ReqEntity } from "../model/ReqEntity";
import { ReqRepository } from "./ReqRepository";
import { ResEntity } from "../../Res/model/ResEntity";

const prisma = new PrismaClient();

export default class ReqRepositoryPrisma extends ReqRepository {
  async getAll() {
    // prisma Reqs
    let datas = await prisma.req.findMany({
      include: {
        res: true,
      },
    });

    // map to ReqEntities
    let reqs: (ReqEntity & { res: ResEntity | null })[] = [];
    datas.forEach((data) => {
      let req: ReqEntity & { res: ResEntity | null } = data;
      reqs.push(req);
    });

    return reqs;
  }

  async getFlagged() {
    // prisma Reqs
    let datas = await prisma.req.findMany({
      where: {
        isThreat: true,
      },
    });

    // map to ReqEntities
    let reqs: ReqEntity[] = [];
    datas.forEach((data: ReqEntity) => {
      let req: ReqEntity = data;
      reqs.push(req);
    });

    return reqs;
  }

  async getFlaggedByDeviceId(deviceId: string) {
    // prisma Reqs
    let datas = await prisma.req.findMany({
      where: {
        deviceId: deviceId,
        isThreat: true,
      },
    });

    // map to ReqEntities
    let reqs: ReqEntity[] = [];
    datas.forEach((data: ReqEntity) => {
      let req: ReqEntity = data;
      reqs.push(req);
    });

    return reqs;
  }

  async getAllByConnectionId(connectionId: string) {
    // prisma Reqs
    let datas = await prisma.req.findMany({
      where: {
        connectionId: connectionId,
      },
      include: {
        res: true,
      },
    });

    // map to ReqEntities
    let reqs: (ReqEntity & { res: ResEntity | null })[] = [];
    datas.forEach((data) => {
      let req: ReqEntity & { res: ResEntity | null } = data;
      reqs.push(req);
    });

    return reqs;
  }

  async getById(id: string) {
    let data = await prisma.req.findUnique({
      where: { id: id },
      include: { res: true },
    });
    if (data) {
      let req: ReqEntity & {
        res: ResEntity | null;
      } = data;
      return req;
    } else {
      return null;
    }
  }

  async create(req: ReqEntity) {
    let response = await prisma.req.create({
      data: {
        id: req.id,
        connectionId: req.connectionId,
        httpVersion: req.httpVersion,
        httpMethod: req.httpMethod,
        body: req.body,
        deviceId: req.deviceId,
        isThreat: req.isThreat,
        threat: req.threat,
      },
    });

    let out: ReqEntity = response;
    return out;
  }

  async update(data: updateReqEntity) {
    let response = await prisma.req.update({
      where: {
        id: data.id,
      },
      data: {
        connectionId: data.connectionId,
        httpVersion: data.httpVersion,
        httpMethod: data.httpMethod,
        body: data.body,
        deviceId: data.deviceId,
        isThreat: data.isThreat,
        threat: data.threat,
      },
    });
    let updated: ReqEntity = response;
    return updated;
  }

  async delete(id: string) {
    let response = await prisma.req.delete({
      where: { id: id },
    });
    if (response) {
      let deletedReq: ReqEntity = response;
      return deletedReq;
    } else {
      return null;
    }
  }
  async flag(id: string) {
    let response = await prisma.req.update({
      where: {
        id: id,
      },
      data: {
        isThreat: true ? false : true,
      },
    });
    if (response) {
      let archivedReq: ReqEntity = response;
      return archivedReq;
    } else {
      return null;
    }
  }

  async respond(id: string, res: ResEntity) {
    let response = await prisma.res.create({
      data: {
        connectionId: res.connectionId,
        code: res.code,
        reqId: id,
      },
    });

    if (response) {
      let res: ResEntity = response;
      return res;
    } else {
      return null;
    }
  }
}

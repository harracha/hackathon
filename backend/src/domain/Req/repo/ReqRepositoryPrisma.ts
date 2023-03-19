import { Prisma, PrismaClient, Req, Res } from "@prisma/client";
import { updateReqEntity } from "../model/updateReqEntity";
import { ReqEntity } from "../model/ReqEntity";
import { ReqRepository } from "./ReqRepository";
import { ResEntity } from "../../Res/model/ResEntity";
import flagReqInteractor from "../../Connection/interactors/flagReqInteractor";
import addToQuarantineInteractor from "../../Device/interactors/addToQuarantineInteractor";
import DeviceRepositoryPrisma from "../../Device/repo/DeviceRepositoryPrisma";

const prisma = new PrismaClient();
const devRepo = new DeviceRepositoryPrisma();

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
      },
    });

    let out: ReqEntity = response;
    return out;
  }

  // async update(data: updateReqEntity) {
  //   let response = await prisma.req.update({
  //     where: {
  //       id: data.id,
  //     },
  //     data: {
  //       connectionId: data.connectionId,
  //       httpVersion: data.httpVersion,
  //       httpMethod: data.httpMethod,
  //       body: data.body,
  //       deviceId: data.deviceId,
  //       isThreat: data.isThreat,
  //     },
  //   });
  //   let updated: ReqEntity = response;
  //   return updated;
  // }

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
        isThreat: true,
      },
    });
    addToQuarantineInteractor(devRepo, response.deviceId, id);
    if (response) {
      let result: ReqEntity = response;
      return result;
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

  async scan(id: string) {
    let reqs = await prisma.req.findMany({
      where: {
        deviceId: id,
      },
    });
    let device = await prisma.device.findUnique({
      where: {
        id: id,
      },
    });
    let localKeyWs = device?.keywords;
    let threats = await prisma.threat.findMany();
    let flag: boolean = false;
    let keyws: string[] = [];
    let flagged: ReqEntity[] = [];
    let num: number = 0;
    reqs.forEach((r: ReqEntity) => {
      threats.forEach((t) => {
        keyws = t.keywords.split(":");
        localKeyWs?.forEach((local) => {
          keyws.push(local);
        });
        keyws.forEach((k) => {
          if (r.body.includes(k)) num += 1;
        });
        if (num > 2) flag = true;
        num = 0;
      });
      if (flag) {
        flagged.push(r);
      }
      flag = false;
    });

    let reqRepo = new ReqRepositoryPrisma();
    flagged.forEach((f) => {
      flagReqInteractor(reqRepo, f.id);
    });

    if (flagged.length > 0) {
      return flagged;
    } else {
      return null;
    }
  }
}

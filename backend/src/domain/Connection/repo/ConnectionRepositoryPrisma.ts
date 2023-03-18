import {
  Prisma,
  PrismaClient,
  Connection,
  ConnectionStatus,
} from "@prisma/client";
import { updateConnectionEntity } from "../model/updateConnectionEntity";
import { ConnectionEntity } from "../model/ConnectionEntity";
import { ConnectionRepository } from "./ConnectionRepository";

const prisma = new PrismaClient();

export default class ConnectionRepositoryPrisma extends ConnectionRepository {
  async getAll() {
    // prisma Connections
    let datas = await prisma.connection.findMany();

    // map to ConnectionEntities
    let connections: ConnectionEntity[] = [];
    datas.forEach((data: Connection) => {
      let connection: ConnectionEntity = data;
      connections.push(connection);
    });

    return connections;
  }

  async getById(id: string) {
    let data = await prisma.connection.findUnique({
      where: { id: id },
      include: { device: true, req: true, res: true },
    });
    if (data) {
      let connection: ConnectionEntity & {
        device: DeviceEntity[];
        req: ReqEntity[];
        res: ResEntity[];
      } = data;
      return connection;
    } else {
      return null;
    }
  }

  async create(connection: ConnectionEntity) {
    let response = await prisma.connection.create({
      data: {
        id: connection.id,
        connectionStatus: ConnectionStatus.PENDING,
      },
    });

    let out: ConnectionEntity = response;
    return out;
  }

  async update(data: updateConnectionEntity) {
    let response = await prisma.connection.update({
      where: {
        id: data.id,
      },
      data: {
        connectionStatus: data.connectionStatus,
      },
    });
    let updated: ConnectionEntity = response;
    return updated;
  }

  async delete(id: string) {
    let response = await prisma.connection.delete({
      where: { id: id },
    });
    if (response) {
      let deletedConnection: ConnectionEntity = response;
      return deletedConnection;
    } else {
      return null;
    }
  }
  async archive(id: string) {
    let response = await prisma.connection.update({
      where: {
        id: id,
      },
      data: {
        connectionStatus: ConnectionStatus.ARCHIVED,
      },
    });
    if (response) {
      let archivedConnection: ConnectionEntity = response;
      return archivedConnection;
    } else {
      return null;
    }
  }
}

import { PrismaClient } from "@prisma/client";
import { updateUserEntity } from "../model/updateUserEntity";
import { UserEntity } from "../model/UserEntity";
import { UserRepository } from "./UserRepository";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserRepositoryPrisma extends UserRepository {
  async getAll() {
    // prisma Users
    let datas = await prisma.user.findMany();

    // map to UserEntities
    let users: UserEntity[] = [];
    datas.forEach((data: UserEntity) => {
      let user: UserEntity = data;
      users.push(user);
    });

    return users;
  }

  async getById(id: string) {
    let data = await prisma.user.findUnique({ where: { id: id } });
    if (data) {
      let user: UserEntity = data;
      return user;
    } else {
      return null;
    }
  }

  async create(user: UserEntity) {
    let response = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });

    console.log(response);

    let out: UserEntity = response;
    return out;
  }
}

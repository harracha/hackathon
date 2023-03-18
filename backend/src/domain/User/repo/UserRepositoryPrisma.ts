import {
  Prisma,
  PrismaClient,
  User,
  UserRole,
  UserStatus,
} from "@prisma/client";
import { updateUserEntity } from "../model/updateUserEntity";
import { UserEntity } from "../model/UserEntity";
import { UserRepository } from "./UserRepository";

const prisma = new PrismaClient();

export default class UserRepositoryPrisma extends UserRepository {
  async getAll() {
    // prisma Users
    let datas = await prisma.user.findMany();

    // map to UserEntities
    let users: UserEntity[] = [];
    datas.forEach((data: User) => {
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
    let info:
      | undefined
      | Prisma.NullableJsonNullValueInput
      | Prisma.InputJsonValue = user.info ? user.info : undefined;
    let response = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        info: info,
        password: user.password,
        userRole: UserRole.DEFAULT,
        avatar: user.avatar,
        googleUserId: user.googleUserId,
        userStatus: UserStatus.PENDING,
      },
    });

    let out: UserEntity = response;
    return out;
  }
  async getUserInfo(id: string) {
    let response = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        info: true,
      },
    });

    if (response === null) {
      return null;
    } else {
      return response.info;
    }
  }
  async update(data: updateUserEntity) {
    let response = await prisma.user.update({
      where: {
        id: data.id
      },
      data: {
        email: data.email,
        info: data,
        password: data.password,
        userRole: data.userRole, //PROMJENITI U PENDING
        avatar: data.avatar,
        googleUserId: data.googleUserId,
      }
    })
    let updated : UserEntity = response;
    return updated
  } 

  async delete(id:string) {
    let response = await prisma.user.delete({
      where: { id: id}
    })
    if (response){
      let deletedUser: UserEntity = response
      return deletedUser
    }
    else {
      return null;
    }
  }
  async archive(id:string) {
    let response = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        userStatus: UserStatus.ARCHIVED
      }
    })
    if (response) {
      let archivedUser: UserEntity = response
      return archivedUser
    }
    else {
      return null;
    }
  }
  async approve(id:string) {
    let response = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        userStatus: UserStatus.ACTIVE
      }
    })
    if (response) {
      let archivedUser: UserEntity = response
      return archivedUser
    }
    else {
      return null;
    }
  }
}

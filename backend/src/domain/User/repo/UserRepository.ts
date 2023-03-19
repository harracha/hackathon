import { Prisma } from "@prisma/client";
import { updateUserEntity } from "../model/updateUserEntity";
import { UserEntity } from "../model/UserEntity";

export abstract class UserRepository {
  async getAll(): Promise<UserEntity[]> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }
  async checkVercode(id: string, vercode: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async create(user: UserEntity): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  async getUserInfo(id: string): Promise<Prisma.JsonValue | null> {
    throw new Error("Method not implemented.");
  }
  async update(user: updateUserEntity): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }
  async archive(id: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }
  async approve(id: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }
  async giveAdmin(id: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }
  async getByGoogleId(id: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }
  async getByEmail(email: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }
}

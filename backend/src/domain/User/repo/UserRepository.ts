import { updateUserEntity } from "../model/updateUserEntity";
import { UserEntity } from "../model/UserEntity";

export abstract class UserRepository {
  async getAll(): Promise<UserEntity[]> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }
  async create(user: UserEntity): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}

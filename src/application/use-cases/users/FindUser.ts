import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { UserMapper } from "../../../utils/mappers/UserMapper";
import { IUser } from "./../../../domain/models/User";

export class FindUser {
  constructor(private repository: IUserRepository) {}

  async executeById(id: string): Promise<IUser | null> {
    const user = await this.repository.findById(id);
    if (!user) return null;
    return await UserMapper.toUserFromUserSchema(user);
  }

  async executeByEmail(email: string): Promise<IUser | null> {
    const user = await this.repository.findByEmail(email);
    if (!user) return null;
    return UserMapper.toUserFromUserSchema(user);
  }
}

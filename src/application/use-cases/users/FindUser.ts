import { IUserRepository } from "../../../domain/interfaces/user/IUserRepository";
import { IUser } from "./../../../domain/models/User";

export class FindUser {
  constructor(private repository: IUserRepository) {}

  async executeById(id: string): Promise<IUser | null> {
    const user = await this.repository.findById(id);

    if (!user) return null;

    return user;
  }

  async executeByEmail(email: string): Promise<IUser | null> {
    const user = await this.repository.findByEmail(email);

    if (!user) return null;

    return user;
  }
}

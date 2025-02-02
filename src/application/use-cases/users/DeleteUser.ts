import { IUserRepository } from "../../../domain/interfaces/user/IUserRepository";

export class DeleteUser {
  constructor(private repository: IUserRepository) {}

  async executeHard(id: string): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user || !user.isActive) throw new Error("This user doesn't exists");

    return await this.repository.delete(id);
  }

  async executeSoft(id: string): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user || !user.isActive) throw new Error("This user doesn't exists");

    user.isActive = false;
    return await this.repository.update(id, user);
  }
}

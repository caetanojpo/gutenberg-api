import { UpdateUserDTO } from "../../../domain/dtos/UpdateUserDTO";
import { IAuthService } from "../../../domain/interfaces/IAuthService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class UpdateUser {
  constructor(
    private repository: IUserRepository,
    private auth: IAuthService
  ) {}

  async execute(id: string, updateData: UpdateUserDTO): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user || !user.isActive) throw new Error("This user doesn't exists");

    updateData.password = await this.auth.hashPassword(updateData.password);

    return await this.repository.update(id, user);
  }
}

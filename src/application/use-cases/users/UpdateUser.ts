import { logger } from "../../../infrastructure/logger";
import { UpdateUserDTO } from "../../../domain/dtos/User/UpdateUserDTO";
import { IAuthService } from "../../../domain/interfaces/IAuthService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { UserException } from "../../../utils/exceptions/UserException";
import { LoggerMessages } from "../../../utils/helpers/LoggerMessages";
import { UserMapper } from "../../../utils/mappers/UserMapper";

export class UpdateUser {
  constructor(
    private repository: IUserRepository,
    private auth: IAuthService
  ) {}

  async execute(id: string, updateData: UpdateUserDTO): Promise<void> {
    const user = await this.repository.findById(id);
    if (!user || !user.isActive) {
      throw new UserException("This user doesn't exists");
    }
    updateData.password = await this.auth.hashPassword(updateData.password);
    logger.logFormatted("info", LoggerMessages.HASHED_PASSWORD);
    const userToUpdate = await UserMapper.toUserFromUpdateDto(updateData);

    return await this.repository.update(id, userToUpdate);
  }
}

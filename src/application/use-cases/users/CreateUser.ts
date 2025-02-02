import { logger } from "../../../infrastructure/logger";
import { CreateUserDTO } from "../../../domain/dtos/User/CreateUserDTO";
import { IAuthService } from "../../../domain/interfaces/IAuthService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { IUser } from "../../../domain/models/User";
import { DatabaseException } from "../../../domain/exceptions/DatabaseException";
import { EntityAlreadyExistsException } from "../../../domain/exceptions/EntityAlreadyExistsException";
import { LoggerMessages } from "../../../utils/helpers/LoggerMessages";
import { UserMapper } from "../../../utils/mappers/UserMapper";

export class CreateUser {
  constructor(
    private repository: IUserRepository,
    private auth: IAuthService
  ) {}

  async execute(userDto: CreateUserDTO): Promise<IUser | null> {
    try {
      const existingUser = await this.repository.findByEmail(userDto.email);

      if (existingUser) {
        logger.logFormatted(
          "warn",
          LoggerMessages.ENTITY_CONFLICT,
          userDto.email
        );
        throw new EntityAlreadyExistsException("User already exists");
      }

      userDto.password = await this.auth.hashPassword(userDto.password);
      logger.logFormatted("info", LoggerMessages.HASHED_PASSWORD);

      const user = await UserMapper.toUserFromCreateDto(userDto);
      logger.logFormatted("info", LoggerMessages.USER_MAPPED);

      const createdUser = await this.repository.save(user);
      return createdUser;
    } catch (error) {
      if (error instanceof EntityAlreadyExistsException) {
        throw error;
      }
      throw new DatabaseException("Error creating user: " + error);
    }
  }
}

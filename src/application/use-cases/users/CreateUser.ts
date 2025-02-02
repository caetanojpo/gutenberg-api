import logger from "../../../config/logger";
import { CreateUserDTO } from "../../../domain/dtos/CreateUserDTO";
import { IAuthService } from "../../../domain/interfaces/IAuthService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { UserException } from "../../../utils/exceptions/UserException";
import { UserMapper } from "../../../utils/mappers/UserMapper";

export class CreateUser {
  constructor(
    private repository: IUserRepository,
    private auth: IAuthService
  ) {}

  async execute(userDto: CreateUserDTO): Promise<void> {
    try {
      logger.info("Checking if user exists with email: " + userDto.email);
      const existingUser = await this.repository.findByEmail(userDto.email);

      if (existingUser) {
        logger.error("User already exists with email: " + userDto.email);
        throw new Error("User already exists");
      }

      logger.info("Hashing password for user: " + userDto.email);
      userDto.password = await this.auth.hashPassword(userDto.password);

      logger.info("Mapping user DTO to user entity: " + userDto.email);
      const user = await UserMapper.toUserFromCreateDto(userDto);
      logger.info("User Mapped " + userDto.email);

      logger.info("Saving user to database: " + userDto.email);
      await this.repository.save(user);

      logger.info("User created successfully: " + userDto.email);
      return;
    } catch (error) {
      logger.error("Error in CreateUser use case: " + error);
      throw error;
    }
  }
}

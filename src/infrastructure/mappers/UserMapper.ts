import { IUser } from "../../domain/models/User";
import { CreateUserDTO } from "../../domain/dtos/User/CreateUserDTO";
import { GetUserDTO } from "../../domain/dtos/User/GetUserDTO";
import { UpdateUserDTO } from "../../domain/dtos/User/UpdateUserDTO";
import { LoginResponseDTO } from "../../domain/dtos/Auth/LoginResponseDTO";
import { logger } from "../logger";
import { LoggerMessages } from "../../utils/helpers/LoggerMessages";

export class UserMapper {
  static toUserSchemaFromUser(user: IUser): any {
    logger.logFormatted(
      "info",
      LoggerMessages.MAPPING_IUSER_TO_USER_SCHEMA,
      user.username
    );
    return {
      username: user.username,
      email: user.email,
      hashedPassword: user.hashedPassword,
      isActive: user.isActive,
    };
  }

  static toUserFromUserSchema(userSchema: any): IUser {
    logger.logFormatted(
      "info",
      LoggerMessages.MAPPING_USER_SCHEMA_TO_IUSER,
      userSchema.username
    );
    return {
      id: userSchema._id.toString(),
      username: userSchema.username,
      email: userSchema.email,
      hashedPassword: userSchema.hashedPassword,
      isActive: userSchema.isActive,
    };
  }

  static toUserFromCreateDto(createUserDTO: CreateUserDTO): IUser {
    logger.logFormatted(
      "info",
      LoggerMessages.MAPPING_CREATE_USER_DTO_TO_IUSER,
      createUserDTO.username
    );
    return {
      username: createUserDTO.username,
      email: createUserDTO.email,
      hashedPassword: createUserDTO.password,
    };
  }

  static toUserFromUpdateDto(updateUserDTO: UpdateUserDTO): IUser {
    logger.logFormatted(
      "info",
      LoggerMessages.MAPPING_UPDATE_USER_DTO_TO_IUSER,
      updateUserDTO.username
    );
    return {
      username: updateUserDTO.username,
      email: updateUserDTO.email,
      hashedPassword: updateUserDTO.password,
    };
  }

  static toGetUserDTOFromUser(user: IUser): GetUserDTO {
    logger.logFormatted(
      "info",
      LoggerMessages.MAPPING_IUSER_TO_GET_USER_DTO,
      user.username
    );
    return {
      id: user.id || "",
      username: user.username,
      email: user.email,
      isActive: user.isActive || false,
    };
  }

  static toLoginResponseDTO(id: string, token: string): LoginResponseDTO {
    logger.logFormatted(
      "info",
      LoggerMessages.MAPPING_TO_LOGIN_RESPONSE_DTO,
      id
    );
    return {
      id: id,
      token: token,
    };
  }
}

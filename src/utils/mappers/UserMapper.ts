import { plainToInstance } from "class-transformer";
import { IUser, User } from "../../domain/models/User";
import { CreateUserDTO } from "../../domain/dtos/CreateUserDTO";
import { GetUserDTO } from "../../domain/dtos/GetUserDTO";
import { UpdateUserDTO } from "../../domain/dtos/UpdateUserDTO";

export class UserMapper {
  static toUserSchemaFromUser(user: IUser): any {
    return {
      username: user.username,
      email: user.email,
      hashedPassword: user.hashedPassword,
      isActive: user.isActive,
    };
  }

  static toUserFromUserSchema(userSchema: any): User {
    return {
      id: userSchema._id.toString(),
      username: userSchema.username,
      email: userSchema.email,
      hashedPassword: userSchema.hashedPassword,
      isActive: userSchema.isActive,
    };
  }

  static toUserFromCreateDto(createUserDTO: CreateUserDTO): IUser {
    return {
      username: createUserDTO.username,
      email: createUserDTO.email,
      hashedPassword: createUserDTO.password,
    };
  }

  static toUserFromUpdateDto(updateUserDTO: UpdateUserDTO): IUser {
    return {
      username: updateUserDTO.username,
      email: updateUserDTO.email,
      hashedPassword: updateUserDTO.password,
    };
  }

  static toGetUserDTOFromUser(user: IUser): GetUserDTO {
    return {
      id: user.id || "",
      username: user.username,
      email: user.email,
      isActive: user.isActive || false,
    };
  }
}

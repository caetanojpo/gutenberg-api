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

  static async toUserFromUserSchema(userSchema: any): Promise<User> {
    return plainToInstance(User, {
      id: userSchema._id.toString(),
      username: userSchema.username,
      email: userSchema.email,
      hashedPassword: userSchema.hashedPassword,
      isActive: userSchema.isActive,
    });
  }

  static async toUserFromCreateDto(
    createUserDTO: CreateUserDTO
  ): Promise<IUser> {
    return plainToInstance(User, {
      username: createUserDTO.username,
      email: createUserDTO.email,
      hashedPassword: createUserDTO.password,
    });
  }

  static async toUserFromUpdateDto(
    updateUserDTO: UpdateUserDTO
  ): Promise<IUser> {
    return plainToInstance(User, {
      username: updateUserDTO.username,
      email: updateUserDTO.email,
      hashedPassword: updateUserDTO.password,
    });
  }

  static toGetUserDTOFromuser(user: IUser): GetUserDTO {
    return plainToInstance(GetUserDTO, {
      id: user.id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
    });
  }
}

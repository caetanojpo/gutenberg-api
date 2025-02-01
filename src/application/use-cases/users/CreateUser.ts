import { CreateUserDTO } from "../../../domain/dtos/CreateUserDTO";
import { IAuthService } from "../../../domain/interfaces/IAuthService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { UserMapper } from "../../../utils/mappers/UserMapper";

export class CreateUser {
  constructor(
    private repository: IUserRepository,
    private auth: IAuthService
  ) {}

  async execute(userDto: CreateUserDTO): Promise<void> {
    const existingUser = await this.repository.findByEmail(userDto.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    userDto.password = await this.auth.hashPassword(userDto.password);
    const user = await UserMapper.toUserFromCreateDto(userDto);
    await this.repository.save(user);
  }
}

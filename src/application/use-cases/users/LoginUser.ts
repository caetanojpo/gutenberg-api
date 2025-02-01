import { IAuthService } from "../../../domain/interfaces/IAuthService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class LoginUser {
  constructor(
    private repository: IUserRepository,
    private auth: IAuthService
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.repository.findByEmail(email);

    if (!user || !user.isActive) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await this.auth.verifyPassword(
      password,
      user.hashedPassword
    );

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = this.auth.generateToken(user);
    return token;
  }
}

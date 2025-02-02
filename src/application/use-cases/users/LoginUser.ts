import logger from "../../../config/logger";
import { IAuthService } from "../../../domain/interfaces/IAuthService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class LoginUser {
  constructor(
    private repository: IUserRepository,
    private auth: IAuthService
  ) {}

  async execute(email: string, password: string): Promise<string> {
    logger.info("Finding user by email");
    const user = await this.repository.findByEmail(email);
    if (!user || !user.isActive) {
      logger.error("An user if this email already exists");
      throw new Error("Invalid credentials");
    }
    logger.info("User found");
    logger.info("Checking password match");
    const isMatch = await this.auth.verifyPassword(
      password,
      user.hashedPassword
    );

    if (!isMatch) {
      logger.error("Password not match");
      throw new Error("Invalid credentials");
    }
    logger.info("Password Match");
    const token = this.auth.generateToken(user);
    logger.info("token generated: " + token);
    return token;
  }
}

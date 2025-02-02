import { logger } from "../../../infrastructure/logger";
import { IAuthService } from "../../../domain/interfaces/IAuthService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { UserException } from "../../../domain/exceptions/UserException";
import { LoggerMessages } from "../../../utils/helpers/LoggerMessages";

export class LoginUser {
  constructor(
    private repository: IUserRepository,
    private auth: IAuthService
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.repository.findByEmail(email);
    if (!user || !user.isActive) {
      throw new UserException("Invalid credentials");
    }
    const isMatch = await this.auth.verifyPassword(
      password,
      user.hashedPassword
    );

    if (!isMatch) {
      logger.logFormatted(
        "error",
        LoggerMessages.PASSWORD_NOT_MATCH,
        user.email
      );
      throw new UserException("Invalid credentials");
    }
    logger.logFormatted("info", LoggerMessages.PASSWORD_MATCH, user.email);
    const token = this.auth.generateToken(user);
    logger.logFormatted("info", LoggerMessages.TOKEN_GENERATED, token);
    return token;
  }
}

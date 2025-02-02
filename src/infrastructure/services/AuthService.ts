import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../env";
import { IAuthService } from "../../domain/interfaces/auth/IAuthService";
import { IUser } from "../../domain/models/User";
import { logger } from "../logger";
import { LoggerMessages } from "../../utils/helpers/LoggerMessages";

export class AuthService implements IAuthService {
  async hashPassword(password: string): Promise<string> {
    logger.logFormatted("info", LoggerMessages.HASHING_PASSWORD);
    return await bcrypt.hash(password, 10);
  }

  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    logger.logFormatted("info", LoggerMessages.CHECKING_PASSWORD);
    return await bcrypt.compare(password, hashedPassword);
  }

  generateToken(user: IUser): string {
    logger.logFormatted("info", LoggerMessages.TOKEN_GENERATION, user.email);
    return jwt.sign({ id: user.id, email: user.email }, env.jwtSecret, {
      expiresIn: "1h",
    });
  }

  verifyToken(token: string): Promise<any> {
    logger.logFormatted("info", LoggerMessages.TOKEN_VERIFICATION, token);
    return new Promise((resolve, reject) => {
      jwt.verify(token, env.jwtSecret, (err, decoded) => {
        if (err) reject("Invalid Token");
        resolve(decoded);
      });
    });
  }
}

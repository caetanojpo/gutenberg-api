import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../../config/env";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { IUser } from "../../domain/models/User";

const JWT_SECRET = env.jwtSecret;

export class AuthService implements IAuthService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  generateToken(user: IUser): string {
    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
  }

  verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) reject("Invalid Token");
        resolve(decoded);
      });
    });
  }
}

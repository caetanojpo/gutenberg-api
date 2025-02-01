import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../../config/env";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { IUser } from "../../domain/models/User";

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
    return jwt.sign({ id: user.id, email: user.email }, env.jwtSecret, {
      expiresIn: "1h",
    });
  }

  verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, env.jwtSecret, (err, decoded) => {
        if (err) reject("Invalid Token");
        resolve(decoded);
      });
    });
  }
}

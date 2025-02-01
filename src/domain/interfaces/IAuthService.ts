import { IUser } from "../models/User";

export interface IAuthService {
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
  generateToken(user: IUser): string;
  verifyToken(token: string): Promise<any>;
}

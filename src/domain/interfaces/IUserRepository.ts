import { IUser } from "../models/User";

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  createUser(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<IUser>;
  updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: string): Promise<void>;
}

import { IUser } from "../../models/User";

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  save(user: IUser): Promise<IUser | null>;
  update(id: string, userData: Partial<IUser>): Promise<void>;
  delete(id: string): Promise<void>;
}

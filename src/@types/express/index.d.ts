import { IUser } from "../../domain/models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};

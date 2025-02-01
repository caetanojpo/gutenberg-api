export interface IUser {
  id?: string;
  username: string;
  email: string;
  hashedPassword: string;
  isActive: boolean;
}

export class User implements IUser {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public hashedPassword: string,
    public isActive: boolean
  ) {}
}

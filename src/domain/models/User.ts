export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

export class User implements IUser {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public password: string
  ) {}
}

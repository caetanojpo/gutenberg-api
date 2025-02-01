export interface IUser {
  id?: string;
  username: string;
  email: string;
  hashedPassword: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements IUser {
  id?: string;
  username: string;
  email: string;
  hashedPassword: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(user: IUser) {
    (this.id = user.id),
      (this.username = user.username),
      (this.email = user.email),
      (this.hashedPassword = user.hashedPassword),
      (this.isActive = true);
  }

  validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}

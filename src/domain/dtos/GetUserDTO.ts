export class GetUserDTO {
  id: string;
  username: string;
  email: string;
  isActive: boolean;

  constructor(id: string, username: string, email: string, isActive: boolean) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.isActive = isActive;
  }
}

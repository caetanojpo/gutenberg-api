export class DatabaseException extends Error {
  constructor(
    message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

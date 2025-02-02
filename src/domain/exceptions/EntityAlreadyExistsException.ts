export class EntityAlreadyExistsException extends Error {
  constructor(
    message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = "EntityAlreadyExistsException";
  }
}

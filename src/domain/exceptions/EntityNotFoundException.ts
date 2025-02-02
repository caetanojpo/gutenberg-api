export class EntityNotFoundException extends Error {
  constructor(
    objectName: string,
    id: string,
    public originalError?: Error
  ) {
    super(objectName + " not found: " + id);
    this.name = "EntityNotFoundException";
  }
}

export class GutenbergException extends Error {
  constructor(
    message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = "GutenbergException";
  }
}

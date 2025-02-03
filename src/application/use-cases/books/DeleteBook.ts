import { BookException } from "../../../domain/exceptions/BookException";
import { IBookRepository } from "../../../domain/interfaces/book/IBookRepository";

export class DeleteBook {
  constructor(private repository: IBookRepository) {}

  async execute(id: string): Promise<void> {
    const book = await this.repository.findById(id);

    if (!book) throw new BookException("This book doesn't exists");

    return await this.repository.delete(id);
  }
}

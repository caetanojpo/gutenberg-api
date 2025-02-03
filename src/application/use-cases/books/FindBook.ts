import { IBookRepository } from "../../../domain/interfaces/book/IBookRepository";
import { IBook } from "../../../domain/models/Book";

export class FindBook {
  constructor(private repository: IBookRepository) {}

  async execute(): Promise<IBook[] | []> {
    const book = await this.repository.findAll();
    return book;
  }

  async executeAllByAuthor(author: string): Promise<IBook[] | []> {
    const book = await this.repository.findAllByAuthor(author);
    return book;
  }

  async executeById(id: string): Promise<IBook | null> {
    const book = await this.repository.findById(id);
    if (!book) return null;
    return book;
  }

  async executeByGutenbergId(gutenbergId: string): Promise<IBook | null> {
    const book = await this.repository.findByGutenbergId(gutenbergId);
    if (!book) return null;
    return book;
  }
}

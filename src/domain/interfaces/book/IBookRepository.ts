import { IBook } from "../../models/Book";

export interface IBookRepository {
  findAll(): Promise<IBook[] | []>;
  findAllByAuthor(author: string): Promise<IBook[] | []>;
  findById(id: string): Promise<IBook | null>;
  findByGutenbergId(gutenbergId: string): Promise<IBook | null>;
  save(book: IBook): Promise<IBook | null>;
  update(id: string, book: Partial<IBook>): Promise<void>;
  delete(id: string): Promise<void>;
}

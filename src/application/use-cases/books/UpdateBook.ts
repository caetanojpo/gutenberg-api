import { UpdateBookContentDTO } from "../../../domain/dtos/Book/UpdateBookContentDTO";
import { UpdateBookMetadataDTO } from "../../../domain/dtos/Book/UpdateBookMetadataDTO";
import { BookException } from "../../../domain/exceptions/BookException";
import { IBookRepository } from "../../../domain/interfaces/book/IBookRepository";

export class UpdateBook {
  constructor(private repository: IBookRepository) {}

  async executeContent(
    id: string,
    updateData: UpdateBookContentDTO
  ): Promise<void> {
    const book = await this.repository.findById(id);

    if (!book) {
      throw new BookException("This book doesn't exists");
    }

    book.content = updateData.content;
    return await this.repository.update(id, book);
  }

  async executeMetadata(
    id: string,
    updateData: UpdateBookMetadataDTO
  ): Promise<void> {
    const book = await this.repository.findById(id);

    if (!book) {
      throw new BookException("This book doesn't exists");
    }

    book.metadata = updateData.metadata;
    return await this.repository.update(id, book);
  }
}

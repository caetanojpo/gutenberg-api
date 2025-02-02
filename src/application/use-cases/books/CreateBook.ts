import { CreateBookDTO } from "../../../domain/dtos/Book/CreateBookDTO";
import { BookException } from "../../../domain/exceptions/BookException";
import { EntityAlreadyExistsException } from "../../../domain/exceptions/EntityAlreadyExistsException";
import { IBookRepository } from "../../../domain/interfaces/book/IBookRepository";
import { IBook } from "../../../domain/models/Book";
import { logger } from "../../../infrastructure/logger";
import { BookMapper } from "../../../infrastructure/mappers/BookMapper";
import { LoggerMessages } from "../../../utils/helpers/LoggerMessages";

export class CreateBook {
  constructor(private repository: IBookRepository) {}

  async execute(bookDto: CreateBookDTO): Promise<IBook | null> {
    try {
      const existingBook = await this.repository.findById(bookDto.id);

      if (existingBook) {
        logger.logFormatted("warn", LoggerMessages.ENTITY_CONFLICT, bookDto.id);
        throw new EntityAlreadyExistsException("Book already exists");
      }

      const book = await BookMapper.toBookFromCreateDto(bookDto);
      logger.logFormatted("info", LoggerMessages.USER_MAPPED);

      return await this.repository.save(book);
    } catch (error) {
      if (error instanceof EntityAlreadyExistsException) {
        throw error;
      }
      throw new BookException("Error creating book: " + error);
    }
  }
}

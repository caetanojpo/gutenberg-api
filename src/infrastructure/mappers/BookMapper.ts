import { CreateBookDTO } from "../../domain/dtos/Book/CreateBookDTO";
import { GetBookContentDTO } from "../../domain/dtos/Book/GetBookContentDTO";
import { GetBookDTO } from "../../domain/dtos/Book/GetBookDTO";
import { GetBookMetadataDTO } from "../../domain/dtos/Book/GetBookMetadataDTO";
import { IBook } from "../../domain/models/Book";
import { LoggerMessages } from "../../utils/helpers/LoggerMessages";
import { logger } from "../logger";

export class BookMapper {
  static toBookSchemaFromBook(book: IBook): any {
    logger.logFormatted(
      "info",
      LoggerMessages.MAPPING_IBOOK_TO_BOOK_SCHEMA,
      book.id
    );
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      coverPictureUrl: book.coverPictureUrl,
      content: book.content,
      metadata: book.metadata,
    };
  }

  static toBookFromBookSchema(bookSchema: any): IBook {
    logger.logFormatted(
      "info",
      LoggerMessages.MAPPING_BOOK_SCHEMA_TO_IBOOK,
      bookSchema.bookname
    );
    return {
      id: bookSchema.id,
      title: bookSchema.title,
      author: bookSchema.author,
      coverPictureUrl: bookSchema.coverPictureUrl,
      content: bookSchema.content,
      metadata: bookSchema.metadata,
    };
  }

  static toBookFromCreateDto(createBookDTO: CreateBookDTO): IBook {
    logger.logFormatted(
      "info",
      LoggerMessages.MAPPING_CREATE_BOOK_DTO_TO_IBOOK,
      createBookDTO.id
    );
    return {
      id: createBookDTO.id,
      title: createBookDTO.title,
      author: createBookDTO.author,
      coverPictureUrl: createBookDTO.coverPictureUrl,
      metadata: createBookDTO.metadata,
    };
  }

  static toGetBookDTOFromBook(book: IBook): GetBookDTO {
    logger.logFormatted(
      "info",
      LoggerMessages.MAPPING_IBOOK_TO_GET_BOOK_DTO,
      book.id
    );
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      coverPictureUrl: book.coverPictureUrl,
      content: book.content,
      metadata: book.metadata,
    };
  }

  static toGetBookContentDTOFromBook(book: IBook): GetBookContentDTO {
    logger.logFormatted(
      "info",
      LoggerMessages.MAPPING_IBOOK_TO_GET_BOOK_CONTENT_DTO,
      book.id
    );
    return {
      content: book.content ?? "",
    };
  }

  static toGetBookMetadataDTOFromBook(book: IBook): GetBookMetadataDTO {
    logger.logFormatted(
      "info",
      LoggerMessages.MAPPING_IBOOK_TO_GET_BOOK_CONTENT_DTO,
      book.id
    );
    return {
      metadata: book.metadata ?? "",
    };
  }
}

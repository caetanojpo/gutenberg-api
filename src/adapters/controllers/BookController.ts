import { CreateBook } from "../../application/use-cases/books/CreateBook";
import { DeleteBook } from "../../application/use-cases/books/DeleteBook";
import { FindBook } from "../../application/use-cases/books/FindBook";
import { UpdateBook } from "../../application/use-cases/books/UpdateBook";
import { Request, Response as ExpressResponse } from "express";
import { Response } from "../../utils/helpers/Response";
import { logger } from "../../infrastructure/logger";
import { LoggerMessages } from "../../utils/helpers/LoggerMessages";
import { CreateBookDTO } from "../../domain/dtos/Book/CreateBookDTO";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BookException } from "../../domain/exceptions/BookException";
import { BookMapper } from "../../infrastructure/mappers/BookMapper";
import { GetBookContentDTO } from "../../domain/dtos/Book/GetBookContentDTO";
import { GetBookDTO } from "../../domain/dtos/Book/GetBookDTO";
import { UpdateBookContentDTO } from "../../domain/dtos/Book/UpdateBookContentDTO";
import { UpdateBookMetadataDTO } from "../../domain/dtos/Book/UpdateBookMetadata";

export class BookController {
  constructor(
    private createCase: CreateBook,
    private deleteCase: DeleteBook,
    private findCase: FindBook,
    private updateCase: UpdateBook
  ) {}

  async createBook(req: Request, res: ExpressResponse): Promise<void> {
    const bookData = plainToInstance(CreateBookDTO, req.body as object);
    logger.logFormatted(
      "info",
      LoggerMessages.START_BOOK_CREATION,
      bookData.id
    );
    const errors = await validate(bookData);

    if (errors.length > 0) {
      logger.logFormatted(
        "error",
        LoggerMessages.VALIDATION_ERROR,
        JSON.stringify(errors)
      );
      return Response.error("Validation failed", 400, errors).send(res);
    }

    try {
      const book = await this.createCase.execute(bookData);

      if (!book || !book.id) {
        return Response.error("Book not created", 400).send(res);
      }

      return Response.success("Book created successfully", book.id, 201).send(
        res
      );
    } catch (error) {
      if (error instanceof BookException || error instanceof Error) {
        return Response.error(
          "Failed to create book: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async getBookById(req: Request, res: ExpressResponse): Promise<void> {
    const bookId = req.params.id;
    logger.logFormatted("info", LoggerMessages.START_BOOK_FIND_BY_ID, bookId);
    try {
      const book = await this.findCase.executeById(bookId);

      if (!book) {
        return Response.error("Book not found", 404).send(res);
      }

      const getBookDTO = BookMapper.toGetBookDTOFromBook(book);
      return Response.success("Book found", getBookDTO, 200).send(res);
    } catch (error) {
      if (error instanceof BookException) {
        return Response.error(
          "Failed to find book: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async getAllBooks(req: Request, res: ExpressResponse): Promise<void> {
    logger.logFormatted("info", LoggerMessages.START_BOOK_FIND_ALL);
    try {
      const books = await this.findCase.execute();

      let getBookDTO: GetBookDTO[];

      if (books.length > 0) {
        books.forEach((b) => {
          getBookDTO.push(BookMapper.toGetBookDTOFromBook(b));
        });
      }

      return Response.success("Books found", books).send(res);
    } catch (error) {
      if (error instanceof BookException) {
        return Response.error(
          "Failed to find book: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async getAllBooksByAuthor(req: Request, res: ExpressResponse): Promise<void> {
    const author = req.params.author;

    if (!author) {
      logger.logFormatted("error", LoggerMessages.VALIDATION_ERROR);
      return Response.error("Validation failed", 400).send(res);
    }

    logger.logFormatted(
      "info",
      LoggerMessages.START_BOOK_FIND_ALL_BY_AUTHOR,
      author
    );
    try {
      const books = await this.findCase.executeAllByAuthor(author);

      let getBookDTO: GetBookDTO[];

      if (books.length > 0) {
        books.forEach((b) => {
          getBookDTO.push(BookMapper.toGetBookDTOFromBook(b));
        });
      }

      return Response.success("Books found", books).send(res);
    } catch (error) {
      if (error instanceof BookException) {
        return Response.error(
          "Failed to find book: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async updateBookContent(req: Request, res: ExpressResponse): Promise<void> {
    const bookId: string = req.params.id;
    const bookData = plainToInstance(UpdateBookContentDTO, req.body as object);
    logger.logFormatted("info", LoggerMessages.START_BOOK_UPDATE, bookId);
    const errors = await validate(bookData);

    if (errors.length > 0) {
      return Response.error("Validation failed", 400, errors).send(res);
    }

    try {
      await this.updateCase.executeContent(bookId, bookData);
      return Response.success("Book updated successfully", null, 204).send(res);
    } catch (error) {
      if (error instanceof BookException) {
        return Response.error(
          "Failed to update book: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async updateBookMetadata(req: Request, res: ExpressResponse): Promise<void> {
    const bookId: string = req.params.id;
    const bookData = plainToInstance(UpdateBookMetadataDTO, req.body as object);
    logger.logFormatted("info", LoggerMessages.START_BOOK_UPDATE, bookId);
    const errors = await validate(bookData);

    if (errors.length > 0) {
      return Response.error("Validation failed", 400, errors).send(res);
    }

    try {
      await this.updateCase.executeMetadata(bookId, bookData);
      return Response.success("Book updated successfully", null, 204).send(res);
    } catch (error) {
      if (error instanceof BookException) {
        return Response.error(
          "Failed to update book: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async deleteBook(req: Request, res: ExpressResponse): Promise<void> {
    const bookId: string = req.params.id;
    logger.logFormatted("info", LoggerMessages.START_BOOK_DELETE, bookId);
    try {
      await this.deleteCase.execute(bookId);
      return Response.success("Book soft deleted successfully", null, 204).send(
        res
      );
    } catch (error) {
      if (error instanceof BookException) {
        return Response.error(
          "Failed to soft delete book: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }
}

import { DatabaseException } from "../../../domain/exceptions/DatabaseException";
import { IBookRepository } from "../../../domain/interfaces/book/IBookRepository";
import { IBook } from "../../../domain/models/Book";
import { LoggerMessages } from "../../../utils/helpers/LoggerMessages";
import { logger } from "../../logger";
import { BookModel } from "../schemas/BookModel";

export class MongoBookRepository implements IBookRepository {
  async findAll(): Promise<IBook[] | []> {
    try {
      logger.logFormatted("info", LoggerMessages.FINDING_ALL_BOOKS);
      const booksDocument = await BookModel.find().exec();

      if (!booksDocument || booksDocument.length === 0) {
        logger.logFormatted(
          "warn",
          LoggerMessages.ENTITY_NOT_FOUND,
          "Books",
          "all"
        );
        return [];
      }

      logger.logFormatted("info", LoggerMessages.ALL_BOOKS_FOUND);
      return booksDocument;
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.DB_ERROR_FINDING, error);
      throw new DatabaseException(
        "MongoDB error when trying to find all books: " + error
      );
    }
  }

  async findAllByAuthor(author: string): Promise<IBook[] | []> {
    try {
      logger.logFormatted(
        "info",
        LoggerMessages.FINDING_ALL_BOOKS_BY_AUTHOR,
        author
      );
      const bookDocuments = await BookModel.find({ author }).exec();

      if (!bookDocuments || bookDocuments.length === 0) {
        logger.logFormatted(
          "warn",
          LoggerMessages.ENTITY_NOT_FOUND,
          "Books",
          author
        );
        return [];
      }

      logger.logFormatted(
        "info",
        LoggerMessages.ALL_BOOKS_FOUND_BY_AUTHOR,
        author
      );
      return bookDocuments;
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.DB_ERROR_FINDING, error);
      throw new DatabaseException(
        `MongoDB error when trying to find books by author (${author}): ` +
          error
      );
    }
  }

  async findById(id: string): Promise<IBook | null> {
    try {
      logger.logFormatted("info", LoggerMessages.FINDING_BOOK_BY_ID, id);
      const bookDocument = await BookModel.findById(id).exec();

      if (!bookDocument) {
        logger.logFormatted(
          "warn",
          LoggerMessages.ENTITY_NOT_FOUND,
          "Book",
          id
        );
        return null;
      }

      logger.logFormatted("info", LoggerMessages.BOOK_FOUND_BY_ID, id);
      return bookDocument;
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.DB_ERROR_FINDING, error);
      throw new DatabaseException(
        `MongoDB error when trying to find book by id: ${error}`
      );
    }
  }

  async findByGutenbergId(gutenbergId: string): Promise<IBook | null> {
    try {
      logger.logFormatted(
        "info",
        LoggerMessages.FINDING_BOOK_BY_GUTENBER_ID,
        gutenbergId
      );
      const bookDocument = await BookModel.findOne({ gutenbergId }).exec();

      if (!bookDocument) {
        logger.logFormatted(
          "warn",
          LoggerMessages.ENTITY_NOT_FOUND,
          "Book",
          gutenbergId
        );
        return null;
      }

      logger.logFormatted(
        "info",
        LoggerMessages.BOOK_FOUND_BY_GUTENBER_ID,
        gutenbergId
      );
      return bookDocument;
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.DB_ERROR_FINDING, error);
      throw new DatabaseException(
        `MongoDB error when trying to find book by id: ${error}`
      );
    }
  }

  async save(book: IBook): Promise<IBook | null> {
    try {
      logger.logFormatted("info", LoggerMessages.SAVING_BOOK, book.title);

      const bookDocument = new BookModel(book);
      await bookDocument.save();
      logger.logFormatted("info", LoggerMessages.BOOK_SAVED, book.title);
      return bookDocument;
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.DB_ERROR_SAVING, error);
      throw new DatabaseException(
        `MongoDB error when trying to save book: ${error}`
      );
    }
  }

  async update(id: string, book: Partial<IBook>): Promise<void> {
    try {
      logger.logFormatted("info", LoggerMessages.UPDATING_BOOK, id);
      const result = await BookModel.updateOne({ _id: id }, book);

      if (result.modifiedCount === 0) {
        logger.logFormatted(
          "warn",
          LoggerMessages.ENTITY_NOT_FOUND,
          "Book",
          id
        );
        return;
      }

      logger.logFormatted("info", LoggerMessages.BOOK_UPDATED, id);
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.DB_ERROR_UPDATING, error);
      throw new DatabaseException(
        `MongoDB error when trying to update book with id: ${id}, ${error}`
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      logger.logFormatted("info", LoggerMessages.DELETING_BOOK, id);
      const result = await BookModel.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        logger.logFormatted(
          "warn",
          LoggerMessages.ENTITY_NOT_FOUND,
          "Book",
          id
        );
        return;
      }

      logger.logFormatted("info", LoggerMessages.BOOK_DELETED, id);
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.DB_ERROR_DELETING, error);
      throw new DatabaseException(
        `MongoDB error when trying to delete book with id: ${id}, ${error}`
      );
    }
  }
}

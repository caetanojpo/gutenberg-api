import { GutenbergService } from "../../infrastructure/services/FetchGutenbergService";
import { Request, Response as ExpressResponse } from "express";
import { Response } from "../../utils/helpers/Response";
import { logger } from "../../infrastructure/logger";
import { FindBook } from "../../application/use-cases/books/FindBook";
import { LoggerMessages } from "../../utils/helpers/LoggerMessages";
import { CreateBook } from "../../application/use-cases/books/CreateBook";
import { GutenbergException } from "../../domain/exceptions/GutenbergException";

export class GutenbergController {
  constructor(
    private service: GutenbergService,
    private findBook: FindBook,
    private createBook: CreateBook
  ) {}

  async fetchGutenbergData(req: Request, res: ExpressResponse): Promise<void> {
    const gutenbergId = req.params.gutenbergId;
    logger.logFormatted(
      "info",
      LoggerMessages.START_FETCHING_GUTENBERG_DATA,
      gutenbergId
    );

    const checkIfBookIsSaved =
      await this.findBook.executeByGutenbergId(gutenbergId);

    if (checkIfBookIsSaved) {
      logger.logFormatted(
        "error",
        LoggerMessages.GUTENBERG_BOOK_ALREADY_FETCHED,
        gutenbergId
      );
      return Response.error("Book is already saved on the database", 401).send(
        res
      );
    }

    try {
      const gutenbergBook = await this.service.fetchBookData(gutenbergId);

      if (!gutenbergBook) {
        logger.logFormatted(
          "error",
          LoggerMessages.GUTENBERG_BOOK_ERROR,
          gutenbergId
        );
        return Response.error(
          "Error fetching the book from gutenberg",
          40
        ).send(res);
      }

      const book = await this.createBook.execute(gutenbergBook);

      if (!book || !book.id) {
        logger.logFormatted(
          "error",
          LoggerMessages.GUTENBERG_BOOK_SAVE_ERROR,
          gutenbergId
        );
        return Response.error("Book not saved", 400).send(res);
      }

      return Response.success("Book saved successfully", book.id, 201).send(
        res
      );
    } catch (error) {
      if (error instanceof GutenbergException) {
        logger.logFormatted(
          "error",
          LoggerMessages.GUTENBERG_BOOK_ERROR,
          gutenbergId
        );
        return Response.error(
          "Failed to fetch from gutenberg: " + error.message,
          400
        ).send(res);
      } else {
        logger.logFormatted("error", LoggerMessages.LOGIN_FAILED, gutenbergId);
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }
}

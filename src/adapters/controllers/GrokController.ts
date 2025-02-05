import { Request, Response as ExpressResponse } from "express";
import { Response } from "../../utils/helpers/Response";
import { logger } from "../../infrastructure/logger";
import { LoggerMessages } from "../../utils/helpers/LoggerMessages";
import { GroqService } from "../../infrastructure/services/GroqService";
import { FindBook } from "../../application/use-cases/books/FindBook";
import { LLMRequestDTO } from "../../domain/dtos/LLM/LMMRequestDTO";
import { LLMAction } from "../../domain/enums/LLMActions";
import { prompts } from "../../utils/helpers/LLMConstants";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export class GroqController {
  constructor(
    private service: GroqService,
    private findBook: FindBook
  ) {}

  private readonly MAX_BOOK_LENGTH = 6000;

  async processGroqRequest(req: Request, res: ExpressResponse): Promise<void> {
    const requestDTO = plainToInstance(LLMRequestDTO, req.body as object);

    console.log(JSON.stringify(requestDTO));
    logger.logFormatted(
      "info",
      LoggerMessages.START_GROQ_PROCESS,
      requestDTO.action
    );

    const errors = await validate(requestDTO);

    if (errors.length > 0) {
      logger.logFormatted(
        "error",
        LoggerMessages.VALIDATION_ERROR,
        JSON.stringify(errors)
      );
      return Response.error("Validation failed", 400, errors).send(res);
    }

    try {
      console.log(requestDTO.id);
      console.log(requestDTO.action);
      if (!Object.values(LLMAction).includes(requestDTO.action)) {
        logger.logFormatted(
          "error",
          LoggerMessages.INVALID_REQUEST,
          "Invalid action"
        );
        return Response.error("Invalid action", 400).send(res);
      }

      const book = await this.findBook.executeByGutenbergId(requestDTO.id);
      if (!book) {
        logger.logFormatted(
          "error",
          LoggerMessages.BOOK_NOT_FOUND_BY_GUTENBER_ID,
          requestDTO.id
        );
        return Response.error("Book not found", 404).send(res);
      }

      const prompt = prompts[requestDTO.action].replace(
        "{{book}}",
        JSON.stringify(book.content ?? "").slice(0, this.MAX_BOOK_LENGTH)
      );
      console.log(prompt);
      const groqResponse = await this.service.getChatCompletion(prompt);
      if (!groqResponse) {
        logger.logFormatted("error", LoggerMessages.GROQ_PROCESS_ERROR, prompt);
        return Response.error("Error processing request with Groq", 400).send(
          res
        );
      }

      return Response.success("Groq response received", groqResponse, 200).send(
        res
      );
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.INTERNAL_SERVER_ERROR, error);
      return Response.error("Internal server error", 500).send(res);
    }
  }
}

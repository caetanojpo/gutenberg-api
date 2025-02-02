import { logger } from "../../infrastructure/logger";
import { LoggerMessages } from "./LoggerMessages";

export class Response {
  public success: boolean;
  public message: string;
  public data: any;
  public statusCode: number;

  constructor(
    success: boolean,
    message: string,
    data: any = null,
    statusCode: number = 200
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }

  static success(
    message: string,
    data: any = null,
    statusCode: number = 200
  ): Response {
    logger.logFormatted(
      "info",
      LoggerMessages.SUCCESSFUL_REQUEST,
      statusCode,
      message
    );
    return new Response(true, message, data, statusCode);
  }

  static error(
    message: string,
    statusCode: number = 500,
    data: any = null
  ): Response {
    logger.logFormatted(
      "error",
      LoggerMessages.ERROR_OCCURED,
      statusCode,
      message
    );
    return new Response(false, message, data, statusCode);
  }

  send(res: any): void {
    res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}

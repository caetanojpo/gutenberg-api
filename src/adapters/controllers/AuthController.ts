import { Request, Response as ExpressResponse } from "express";
import { LoginUser } from "../../application/use-cases/users/LoginUser";
import { UserException } from "../../utils/exceptions/UserException";
import { logger } from "../../infrastructure/logger";
import { Response } from "../../utils/helpers/Response";
import { plainToInstance } from "class-transformer";
import { LoginDTO } from "../../domain/dtos/Auth/LoginDTO";
import { validate } from "class-validator";
import { LoggerMessages } from "../../utils/helpers/LoggerMessages";

export class AuthController {
  constructor(private loginCase: LoginUser) {}

  async login(req: Request, res: ExpressResponse): Promise<void> {
    const loginData = plainToInstance(LoginDTO, req.body as object);
    logger.logFormatted("info", LoggerMessages.LOGIN_ATTEMPT, loginData.email);
    const errors = await validate(loginData);

    if (errors.length > 0) {
      logger.logFormatted(
        "error",
        LoggerMessages.LOGIN_FAILED,
        loginData.email
      );
      return Response.error(
        "Email and password are required",
        400,
        errors
      ).send(res);
    }

    try {
      const token = await this.loginCase.execute(
        loginData.email,
        loginData.password
      );
      logger.logFormatted(
        "info",
        LoggerMessages.LOGIN_SUCCESS,
        loginData.email
      );
      return Response.success(
        "User authenticated successfully",
        token,
        201
      ).send(res);
    } catch (error) {
      if (error instanceof UserException) {
        logger.logFormatted(
          "error",
          LoggerMessages.LOGIN_FAILED,
          loginData.email
        );
        return Response.error("Failed to login: " + error.message, 400).send(
          res
        );
      } else {
        logger.logFormatted(
          "error",
          LoggerMessages.LOGIN_FAILED,
          loginData.email
        );
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }
}

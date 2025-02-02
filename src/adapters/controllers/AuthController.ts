import { Request, Response as ExpressResponse } from "express";
import { LoginUser } from "../../application/use-cases/users/LoginUser";
import { UserException } from "../../utils/exceptions/UserException";
import logger from "../../config/logger";
import { Response } from "../../utils/Response";

export class AuthController {
  constructor(private loginCase: LoginUser) {}

  async login(req: Request, res: ExpressResponse): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      logger.warn("Login attempt with missing email or password");
      Response.error("Email and password are required", 400).send(res);
    }

    try {
      const token = await this.loginCase.execute(email, password);
      logger.info(`User logged in successfully: ${email}`);
      res.json({ token });
      Response.success("User authenticated successfully", token, 201).send(res);
    } catch (error) {
      if (error instanceof UserException) {
        logger.error(`User error during login: ${error.message}`);
        Response.error("Failed to login: " + error.message, 400).send(res);
      } else {
        logger.error("Unexpected error during login:", error);
        Response.error("Internal server error", 500).send(res);
      }
    }
  }
}

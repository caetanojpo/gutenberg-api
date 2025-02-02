import { CreateUser } from "../../application/use-cases/users/CreateUser";
import { DeleteUser } from "../../application/use-cases/users/DeleteUser";
import { FindUser } from "../../application/use-cases/users/FindUser";
import { UpdateUser } from "../../application/use-cases/users/UpdateUser";
import { Request, Response as ExpressResponse } from "express";
import { UserException } from "../../domain/exceptions/UserException";
import { CreateUserDTO } from "../../domain/dtos/User/CreateUserDTO";
import { UserMapper } from "../../utils/mappers/UserMapper";
import { UpdateUserDTO } from "../../domain/dtos/User/UpdateUserDTO";
import { Response } from "../../utils/helpers/Response";
import { logger } from "../../infrastructure/logger";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AuthService } from "../../infrastructure/services/AuthService";
import { LoggerMessages } from "../../utils/helpers/LoggerMessages";

export class UserController {
  constructor(
    private createCase: CreateUser,
    private findCase: FindUser,
    private deleteCase: DeleteUser,
    private updateCase: UpdateUser,
    private auth: AuthService
  ) {}

  async createUser(req: Request, res: ExpressResponse): Promise<void> {
    const userData = plainToInstance(CreateUserDTO, req.body as object);
    logger.logFormatted(
      "info",
      LoggerMessages.START_USER_CREATION,
      userData.email
    );
    const errors = await validate(userData);

    if (errors.length > 0) {
      logger.logFormatted(
        "error",
        LoggerMessages.VALIDATION_ERROR,
        JSON.stringify(errors)
      );
      return Response.error("Validation failed", 400, errors).send(res);
    }

    try {
      const user = await this.createCase.execute(userData);

      if (!user || !user.id) {
        return Response.error("User not created", 400).send(res);
      }

      const token = this.auth.generateToken(user);

      const authenticatedResponse = UserMapper.toLoginResponseDTO(
        user.id,
        token
      );

      return Response.success(
        "User created successfully",
        authenticatedResponse,
        201
      ).send(res);
    } catch (error) {
      if (error instanceof UserException || error instanceof Error) {
        return Response.error(
          "Failed to create user: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async getUserById(req: Request, res: ExpressResponse): Promise<void> {
    const userId = req.params.id;
    logger.logFormatted("info", LoggerMessages.START_USER_FIND_BY_ID, userId);
    try {
      const user = await this.findCase.executeById(userId);

      if (!user) {
        return Response.error("User not found", 404).send(res);
      }

      const getUserDTO = UserMapper.toGetUserDTOFromUser(user);
      return Response.success("User found", getUserDTO, 200).send(res);
    } catch (error) {
      if (error instanceof UserException) {
        return Response.error(
          "Failed to find user: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async getUserByEmail(req: Request, res: ExpressResponse): Promise<void> {
    const userEmail: string = req.params.email;
    logger.logFormatted(
      "info",
      LoggerMessages.START_USER_FIND_BY_EMAIL,
      userEmail
    );
    try {
      const user = await this.findCase.executeByEmail(userEmail);

      if (!user) {
        return Response.error("User not found", 404).send(res);
      }

      const getUserDTO = UserMapper.toGetUserDTOFromUser(user);
      return Response.success("User found", getUserDTO).send(res);
    } catch (error) {
      if (error instanceof UserException) {
        return Response.error(
          "Failed to find user: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async updateUser(req: Request, res: ExpressResponse): Promise<void> {
    const userId: string = req.params.id;
    const userData = plainToInstance(UpdateUserDTO, req.body as object);
    logger.logFormatted("info", LoggerMessages.START_USER_UPDATE, userId);
    const errors = await validate(userData);

    if (errors.length > 0) {
      return Response.error("Validation failed", 400, errors).send(res);
    }

    try {
      await this.updateCase.execute(userId, userData);
      return Response.success("User updated successfully", null, 204).send(res);
    } catch (error) {
      if (error instanceof UserException) {
        return Response.error(
          "Failed to update user: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async softDeleteUser(req: Request, res: ExpressResponse): Promise<void> {
    const userId: string = req.params.id;
    logger.logFormatted("info", LoggerMessages.START_USER_SOFT_DELETE, userId);
    try {
      await this.deleteCase.executeSoft(userId);
      return Response.success("User soft deleted successfully", null, 204).send(
        res
      );
    } catch (error) {
      if (error instanceof UserException) {
        return Response.error(
          "Failed to soft delete user: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async hardDeleteUser(req: Request, res: ExpressResponse): Promise<void> {
    const userId = req.params.id;
    logger.logFormatted("info", LoggerMessages.START_USER_HARD_DELETE, userId);
    try {
      await this.deleteCase.executeHard(userId);
      return Response.success("User hard deleted successfully", null, 204).send(
        res
      );
    } catch (error) {
      if (error instanceof UserException) {
        return Response.error(
          "Failed to hard delete user: " + error.message,
          400
        ).send(res);
      } else {
        return Response.error("Internal server error", 500).send(res);
      }
    }
  }
}

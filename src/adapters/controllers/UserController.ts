import { CreateUser } from "../../application/use-cases/users/CreateUser";
import { DeleteUser } from "../../application/use-cases/users/DeleteUser";
import { FindUser } from "../../application/use-cases/users/FindUser";
import { UpdateUser } from "../../application/use-cases/users/UpdateUser";
import { Request, Response as ExpressResponse } from "express";
import { UserException } from "../../utils/exceptions/UserException";
import { CreateUserDTO } from "../../domain/dtos/CreateUserDTO";
import { UserMapper } from "../../utils/mappers/UserMapper";
import { UpdateUserDTO } from "../../domain/dtos/UpdateUserDTO";
import { Response } from "../../utils/Response";
import logger from "../../config/logger";

export class UserController {
  constructor(
    private createCase: CreateUser,
    private findCase: FindUser,
    private deleteCase: DeleteUser,
    private updateCase: UpdateUser
  ) {}

  async createUser(req: Request, res: ExpressResponse): Promise<void> {
    const userData: CreateUserDTO = req.body;
    try {
      logger.info("Creating user with email: " + userData.email);
      const user = await this.createCase.execute(userData);
      Response.success("User created successfully", user, 201).send(res);
    } catch (error) {
      logger.error("Error in createUser: " + error);
      if (error instanceof UserException || error instanceof Error) {
        Response.error("Failed to create user: " + error.message, 400).send(
          res
        );
      } else {
        Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async getUserById(req: Request, res: ExpressResponse): Promise<void> {
    const userId = req.params.id;
    try {
      const user = await this.findCase.executeById(userId);

      if (!user) {
        Response.error("User not found", 404).send(res);
        return;
      }

      const getUserDTO = UserMapper.toGetUserDTOFromUser(user);
      Response.success("User found", getUserDTO).send(res);
    } catch (error) {
      if (error instanceof UserException) {
        Response.error("Failed to find user: " + error.message, 400).send(res);
      } else {
        Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async getUserByEmail(req: Request, res: ExpressResponse): Promise<void> {
    const userEmail: string = req.params.email;
    try {
      const user = await this.findCase.executeByEmail(userEmail);

      if (!user) {
        Response.error("User not found", 404).send(res);
        return;
      }

      const getUserDTO = UserMapper.toGetUserDTOFromUser(user);
      Response.success("User found", getUserDTO).send(res);
    } catch (error) {
      if (error instanceof UserException) {
        Response.error("Failed to find user: " + error.message, 400).send(res);
      } else {
        Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async updateUser(req: Request, res: ExpressResponse): Promise<void> {
    const userId: string = req.params.id;
    const userData: UpdateUserDTO = req.body;
    try {
      await this.updateCase.execute(userId, userData);
      Response.success("User updated successfully", null, 204).send(res);
    } catch (error) {
      if (error instanceof UserException) {
        Response.error("Failed to update user: " + error.message, 400).send(
          res
        );
      } else {
        Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async softDeleteUser(req: Request, res: ExpressResponse): Promise<void> {
    const userId: string = req.params.id;
    try {
      await this.deleteCase.executeSoft(userId);
      Response.success("User soft deleted successfully", null, 204).send(res);
    } catch (error) {
      if (error instanceof UserException) {
        Response.error(
          "Failed to soft delete user: " + error.message,
          400
        ).send(res);
      } else {
        Response.error("Internal server error", 500).send(res);
      }
    }
  }

  async hardDeleteUser(req: Request, res: ExpressResponse): Promise<void> {
    const userId = req.params.id;
    try {
      await this.deleteCase.executeHard(userId);
      Response.success("User hard deleted successfully", null, 204).send(res);
    } catch (error) {
      if (error instanceof UserException) {
        Response.error(
          "Failed to hard delete user: " + error.message,
          400
        ).send(res);
      } else {
        Response.error("Internal server error", 500).send(res);
      }
    }
  }
}

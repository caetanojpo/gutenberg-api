import { UserModel } from "../schemas/UserModel";
import { IUserRepository } from "../../../domain/interfaces/user/IUserRepository";
import { UserMapper } from "../../../utils/mappers/UserMapper";
import { DatabaseException } from "../../../domain/exceptions/DatabaseException";
import { EntityNotFoundException } from "../../../domain/exceptions/EntityNotFoundException";
import { logger } from "../../logger";
import { IUser } from "./../../../domain/models/User";
import { LoggerMessages } from "../../../utils/helpers/LoggerMessages";

export class MongoUserRepository implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    try {
      logger.logFormatted("info", LoggerMessages.FINDING_USER_BY_ID, id);
      const userDocument = await UserModel.findById(id).exec();

      if (!userDocument) {
        logger.logFormatted(
          "warn",
          LoggerMessages.ENTITY_NOT_FOUND,
          "User",
          id
        );
        return null;
      }

      logger.logFormatted("info", LoggerMessages.USER_FOUND_BY_ID, id);
      return UserMapper.toUserFromUserSchema(userDocument);
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.DB_ERROR_FINDING, error);
      throw new DatabaseException(
        "MongoDB error when trying to find user by id: " + error
      );
    }
  }
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      logger.logFormatted("info", LoggerMessages.FINDING_USER_BY_EMAIL, email);
      const userDocument = await UserModel.findOne({ email }).exec();

      if (!userDocument) {
        logger.logFormatted(
          "warn",
          LoggerMessages.ENTITY_NOT_FOUND,
          "User",
          email
        );
        return null;
      }

      logger.logFormatted("info", LoggerMessages.USER_FOUND_BY_EMAIL, email);
      const mappedUser = UserMapper.toUserFromUserSchema(userDocument);
      logger.logFormatted("info", LoggerMessages.USER_MAPPED);
      return mappedUser;
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.DB_ERROR_FINDING, error);
      throw new DatabaseException(
        "MongoDB error when trying to find user by email: " + error
      );
    }
  }

  async save(user: IUser): Promise<IUser | null> {
    try {
      logger.logFormatted("info", LoggerMessages.SAVING_USER, user.email);
      const userDocument = new UserModel(user);
      const createdUser = await userDocument.save();
      logger.logFormatted("info", LoggerMessages.USER_SAVED, user.email);
      return createdUser;
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.DB_ERROR_SAVING, error);
      throw new DatabaseException(
        "MongoDB error when trying to save user: " + error
      );
    }
  }

  async update(id: string, userData: Partial<IUser>): Promise<void> {
    try {
      logger.logFormatted("info", LoggerMessages.UPDATING_USER, id);
      const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
        new: true,
      }).exec();

      if (!updatedUser) {
        logger.logFormatted(
          "error",
          LoggerMessages.ENTITY_NOT_FOUND,
          "User",
          id
        );
        throw new EntityNotFoundException("User", id);
      }

      logger.logFormatted("info", LoggerMessages.USER_UPDATED, id);
      return;
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.DB_ERROR_UPDATING, error);
      throw new DatabaseException(
        "MongoDB error when trying to update user: " + error
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      logger.logFormatted("info", LoggerMessages.DELETING_USER, id);
      const deletedUser = await UserModel.findByIdAndDelete(id).exec();

      if (!deletedUser) {
        logger.logFormatted(
          "error",
          LoggerMessages.ENTITY_NOT_FOUND,
          "User",
          id
        );
        throw new EntityNotFoundException("User", id);
      }

      logger.logFormatted("info", LoggerMessages.USER_DELETED, id);
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.DB_ERROR_DELETING, error);
      throw new DatabaseException(
        "MongoDB error when trying to delete user: " + error
      );
    }
  }
}

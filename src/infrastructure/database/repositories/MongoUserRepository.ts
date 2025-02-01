import { UserModel } from "./../schemas/UserSchema";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { IUser } from "../../../domain/models/User";
import { UserMapper } from "../../../utils/mappers/UserMapper";
import { DatabaseException } from "../../../utils/exceptions/DatabaseException";
import { EntityNotFoundException } from "../../../utils/exceptions/EntityNotFoundException";

export class MongoUserRepository implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    try {
      const userDocument = await UserModel.findById(id).exec();

      if (!userDocument) throw new EntityNotFoundException("User", id);

      return UserMapper.toUserFromUserSchema(userDocument);
    } catch (error) {
      throw new DatabaseException(
        "MongoDB error when trying to find user by id: " + error
      );
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const userDocument = await UserModel.findOne({ email }).exec();

      if (!userDocument) throw new EntityNotFoundException("User", email);

      return UserMapper.toUserFromUserSchema(userDocument);
    } catch (error) {
      throw new DatabaseException(
        "MongoDB error when trying to find user by email: " + error
      );
    }
  }
  async save(user: IUser): Promise<void> {
    try {
      const userDocument = new UserModel(user);
      await userDocument.save();
      return;
    } catch (error) {
      throw new DatabaseException(
        "MongoDB error when trying to save user: " + error
      );
    }
  }

  async update(id: string, userData: Partial<IUser>): Promise<void> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
        new: true,
      }).exec();

      if (!updatedUser) {
        throw new EntityNotFoundException("User", id);
      }

      return;
    } catch (error) {
      throw new DatabaseException(
        "MongoDB error when trying to update user: " + error
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(id).exec();

      if (!deletedUser) {
        throw new EntityNotFoundException("User", id);
      }
    } catch (error) {
      throw new DatabaseException(
        "MongoDB error when trying to delete user: " + error
      );
    }
  }
}

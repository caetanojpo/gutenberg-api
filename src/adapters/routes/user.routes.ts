import express from "express";
import { UserController } from "../controllers/UserController";
import { CreateUser } from "../../application/use-cases/users/CreateUser";
import { DeleteUser } from "../../application/use-cases/users/DeleteUser";
import { FindUser } from "../../application/use-cases/users/FindUser";
import { UpdateUser } from "../../application/use-cases/users/UpdateUser";
import { MongoUserRepository } from "../../infrastructure/database/repositories/MongoUserRepository";
import { AuthService } from "../../infrastructure/services/AuthService";
import { authMiddleware } from "../middleware/AuthMiddleware";

const userRouter = express.Router();

const authService = new AuthService();
const userRepository = new MongoUserRepository();
const createUser = new CreateUser(userRepository, authService);
const findUser = new FindUser(userRepository);
const deleteUser = new DeleteUser(userRepository);
const updateUser = new UpdateUser(userRepository, authService);

const userController = new UserController(
  createUser,
  findUser,
  deleteUser,
  updateUser,
  authService
);

userRouter.post("", (req, res) => userController.createUser(req, res));
userRouter.get("/:id", authMiddleware(authService, findUser), (req, res) =>
  userController.getUserById(req, res)
);
userRouter.get(
  "/email/:email",
  authMiddleware(authService, findUser),
  (req, res) => userController.getUserByEmail(req, res)
);
userRouter.put("/:id", authMiddleware(authService, findUser), (req, res) =>
  userController.updateUser(req, res)
);
userRouter.delete(
  "/soft/:id",
  authMiddleware(authService, findUser),
  (req, res) => userController.softDeleteUser(req, res)
);
userRouter.delete(
  "/hard/:id",
  authMiddleware(authService, findUser),
  (req, res) => userController.hardDeleteUser(req, res)
);

export default userRouter;

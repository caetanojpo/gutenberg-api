import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { LoginUser } from "../../application/use-cases/users/LoginUser";
import { IUserRepository } from "../../domain/interfaces/user/IUserRepository";
import { IAuthService } from "../../domain/interfaces/auth/IAuthService";
import { AuthService } from "../../infrastructure/services/AuthService";
import { MongoUserRepository } from "../../infrastructure/database/repositories/MongoUserRepository";

const authRouter = Router();

const userRepository: IUserRepository = new MongoUserRepository();
const authService: IAuthService = new AuthService();
const loginUserUseCase = new LoginUser(userRepository, authService);
const authController = new AuthController(loginUserUseCase);

authRouter.post("/login", async (req, res) => authController.login(req, res));

export default authRouter;

import express from "express";
import { FindBook } from "../../application/use-cases/books/FindBook";
import { FindUser } from "../../application/use-cases/users/FindUser";
import { MongoBookRepository } from "../../infrastructure/database/repositories/MongoBookRepository";
import { MongoUserRepository } from "../../infrastructure/database/repositories/MongoUserRepository";
import { AuthService } from "../../infrastructure/services/AuthService";
import { GroqService } from "../../infrastructure/services/GroqService";
import { GroqController } from "../controllers/GrokController";
import { authMiddleware } from "../middleware/AuthMiddleware";

const groqRouter = express.Router();

const authService = new AuthService();
const groqService = new GroqService();
const bookRepository = new MongoBookRepository();
const findBook = new FindBook(bookRepository);
const userRepository = new MongoUserRepository();
const findUser = new FindUser(userRepository);

const groqController = new GroqController(groqService, findBook);

groqRouter.post("", authMiddleware(authService, findUser), (req, res) =>
  groqController.processGroqRequest(req, res)
);

export default groqRouter;

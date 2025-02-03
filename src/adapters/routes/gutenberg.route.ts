import express from "express";
import { AuthService } from "../../infrastructure/services/AuthService";
import { MongoBookRepository } from "../../infrastructure/database/repositories/MongoBookRepository";
import { CreateBook } from "../../application/use-cases/books/CreateBook";
import { FindBook } from "../../application/use-cases/books/FindBook";
import { MongoUserRepository } from "../../infrastructure/database/repositories/MongoUserRepository";
import { FindUser } from "../../application/use-cases/users/FindUser";
import { GutenbergService } from "../../infrastructure/services/FetchGutenbergService";
import { GutenbergController } from "../controllers/GutenbergController";
import { authMiddleware } from "../middleware/AuthMiddleware";

const gutenbergRouter = express.Router();

const authService = new AuthService();
const gutenbergService = new GutenbergService();
const bookRepository = new MongoBookRepository();
const createBook = new CreateBook(bookRepository);
const findBook = new FindBook(bookRepository);
const userRepository = new MongoUserRepository();
const findUser = new FindUser(userRepository);

const gutenbergController = new GutenbergController(
  gutenbergService,
  findBook,
  createBook
);

gutenbergRouter.post(
  "/:gutenbergId",
  authMiddleware(authService, findUser),
  (req, res) => gutenbergController.fetchGutenbergData(req, res)
);

export default gutenbergRouter;

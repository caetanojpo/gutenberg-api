import express from "express";
import { AuthService } from "../../infrastructure/services/AuthService";
import { MongoBookRepository } from "../../infrastructure/database/repositories/MongoBookRepository";
import { CreateBook } from "../../application/use-cases/books/CreateBook";
import { FindBook } from "../../application/use-cases/books/FindBook";
import { DeleteBook } from "../../application/use-cases/books/DeleteBook";
import { UpdateBook } from "../../application/use-cases/books/UpdateBook";
import { BookController } from "../controllers/BookController";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { FindUser } from "../../application/use-cases/users/FindUser";
import { MongoUserRepository } from "../../infrastructure/database/repositories/MongoUserRepository";

const bookRouter = express.Router();

const authService = new AuthService();
const bookRepository = new MongoBookRepository();
const createBook = new CreateBook(bookRepository);
const findBook = new FindBook(bookRepository);
const deleteBook = new DeleteBook(bookRepository);
const updateBook = new UpdateBook(bookRepository);
const userRepository = new MongoUserRepository();
const findUser = new FindUser(userRepository);

const bookController = new BookController(
  createBook,
  deleteBook,
  findBook,
  updateBook
);

bookRouter.post("", authMiddleware(authService, findUser), (req, res) =>
  bookController.createBook(req, res)
);

bookRouter.get("/:id", authMiddleware(authService, findUser), (req, res) =>
  bookController.getBookById(req, res)
);

bookRouter.get(
  "/gutenberg/:gutenbergId",
  authMiddleware(authService, findUser),
  (req, res) => bookController.getBookByGutenbergId(req, res)
);

bookRouter.get("/", authMiddleware(authService, findUser), (req, res) =>
  bookController.getAllBooks(req, res)
);

bookRouter.get(
  "/author/:author",
  authMiddleware(authService, findUser),
  (req, res) => bookController.getAllBooksByAuthor(req, res)
);

bookRouter.patch(
  "/content/:id",
  authMiddleware(authService, findUser),
  (req, res) => bookController.updateBookContent(req, res)
);

bookRouter.patch(
  "/metadata/:id",
  authMiddleware(authService, findUser),
  (req, res) => bookController.updateBookMetadata(req, res)
);

bookRouter.delete("/:id", authMiddleware(authService, findUser), (req, res) =>
  bookController.deleteBook(req, res)
);

export default bookRouter;

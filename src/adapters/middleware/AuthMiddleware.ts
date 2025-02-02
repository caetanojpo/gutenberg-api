import { Request, Response as ExpressResponse, NextFunction } from "express";
import { AuthService } from "../../infrastructure/services/AuthService";
import { Response } from "../../utils/helpers/Response";
import { FindUser } from "../../application/use-cases/users/FindUser";
import { LoggerMessages } from "../../utils/helpers/LoggerMessages";
import { logger } from "../../infrastructure/logger";

export const authMiddleware = (
  authService: AuthService,
  findUser: FindUser
) => {
  return async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<void> => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      logger.logFormatted("error", LoggerMessages.NO_TOKEN);
      return Response.error("Unauthorized: No token provided", 401).send(res);
    }

    try {
      const decoded = await authService.verifyToken(token);
      req.user = decoded;

      if (!req.user?.id) {
        logger.logFormatted("error", LoggerMessages.TOKEN_INVALID);
        return Response.error("Unauthorized: Invalid token", 401).send(res);
      }

      const userFound = await findUser.executeById(req.user?.id);

      if (!userFound?.isActive) {
        logger.logFormatted("error", LoggerMessages.TOKEN_INVALID);
        return Response.error("Unauthorized: Invalid token", 401).send(res);
      }

      next();
    } catch (error) {
      logger.logFormatted("error", LoggerMessages.TOKEN_INVALID);
      return Response.error("Unauthorized: Invalid token", 401).send(res);
    }
  };
};

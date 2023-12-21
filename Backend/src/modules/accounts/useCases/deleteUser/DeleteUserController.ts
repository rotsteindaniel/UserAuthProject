import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { NotFoundError } from "@shared/errors/ApiError";

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;

      const deleteUserUseCase = container.resolve(DeleteUserUseCase);
      await deleteUserUseCase.execute({ id });

      return response.json({ message: "User deleted successfully" });
    } catch (error) {
      if (error instanceof NotFoundError) {
       throw new NotFoundError(error.message);
      }
    }
  }
}

export { DeleteUserController };

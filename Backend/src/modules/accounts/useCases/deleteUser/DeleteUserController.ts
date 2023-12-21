import { Request, Response } from "express";
import { container } from "tsyringe";

import { NotFoundError } from "@shared/errors/ApiError";
import { DeleteUserUseCase } from "./DeleteUserUseCase";


class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;

      const deleteUserUseCase = container.resolve(DeleteUserUseCase);
      await deleteUserUseCase.execute({ id });

      return response.json({ message: "User deleted successfully" });
    } catch (error) {
      if (error) {
       throw new NotFoundError("User not found");
      }
    }
  }
}

export { DeleteUserController };

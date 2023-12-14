import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from 'zod';

import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { BadRequestError, NotFoundError } from "@shared/errors/ApiError";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    });

    try {
      const { id } = request.user;
      const { name, email } = updateBodySchema.parse(request.body);

      const updateUserUseCase = container.resolve(UpdateUserUseCase);

      const updatedUser = await updateUserUseCase.execute({ id, name, email });
      return response.json({
        data: updatedUser,
        message: "User updated successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Tratar erros de validação aqui
        return response.status(400).json({
          errors: error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        });
      } else if (error instanceof NotFoundError) {
        // Tratar erros específicos de negócios, como usuário não encontrado
        return response.status(404).json({
          error: error.message,
        });
      } else if (error instanceof BadRequestError) {
        // Tratar outros erros específicos de negócios, se necessário
        return response.status(400).json({
          error: error.message,
        });
      } else {
        // Outros tipos de erros, como erros internos do servidor
        console.error(error);
        return response.status(500).json({
          error: "Internal Server Error",
        });
      }
    }
  }
}

export { UpdateUserController };


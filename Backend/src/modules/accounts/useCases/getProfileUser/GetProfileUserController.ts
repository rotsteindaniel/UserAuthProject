import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from 'zod';

import { GetProfileUserUseCase } from "./GetProfileUserUseCase";
import { NotFoundError } from "@shared/errors/ApiError";

class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const profileBodySchema = z.object({
      id: z.string().uuid(), // Supondo que o ID seja uma string no formato UUID
    });

    try {
      const { id } = profileBodySchema.parse(request.user);

      const getProfileUserUseCase = container.resolve(GetProfileUserUseCase);

      const user = await getProfileUserUseCase.execute(id);
      return response.json(user);
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

export { GetUserProfileController };


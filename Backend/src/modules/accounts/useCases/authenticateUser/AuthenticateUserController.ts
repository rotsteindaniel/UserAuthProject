import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from 'zod';

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { BadRequestError } from "@shared/errors/ApiError";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    try {
      const { email, password } = authenticateBodySchema.parse(request.body);

      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

      const token = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.json(token);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Tratar erros de validação aqui
        return response.status(400).json({
          errors: error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        });
      } else if (error instanceof BadRequestError) {
        // Tratar erros específicos de negócios, se necessário
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

export { AuthenticateUserController };


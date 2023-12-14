import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from 'zod';

import { CreateUserUseCase } from "./CreateUserUseCase";
import { BadRequestError } from "@shared/errors/ApiError";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    try {
      const { name, email, password } = registerBodySchema.parse(request.body);

      const createUserUseCase = container.resolve(CreateUserUseCase);

      await createUserUseCase.execute({
        name,
        email,
        password,
      });

      return response.status(201).json({
        message: "User created successfully",
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

export { CreateUserController };


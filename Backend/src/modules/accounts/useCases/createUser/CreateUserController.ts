import { Request, Response } from "express";

import { container } from "tsyringe";
import { BadRequestError } from "@shared/errors/ApiError";

import { CreateUserUseCase } from "./CreateUserUseCase";
import { z } from "zod";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      date: z.string(),
      gender: z.string(),
      password: z.string().min(6),
    });

    try {
      const { name, email, date, gender, password } = registerBodySchema.parse(
        request.body
      );

      const createUserUseCase = container.resolve(CreateUserUseCase);

      await createUserUseCase.execute({
        name,
        email,
        date,
        gender,
        password,
      });

      return response.status(201).json({
        message: "User created successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      } else if (error) {
        throw new BadRequestError("User already exists");
      }
    }
  }
}

export { CreateUserController };

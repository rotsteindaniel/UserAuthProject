import { Request, Response } from "express";
import { container } from "tsyringe";
import { NotFoundError } from "@shared/errors/ApiError";

import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { z } from "zod";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      date: z.string(),
      gender: z.string(),
    });

    try {
      const { id } = request.user;
      const { name, email, date, gender } = updateBodySchema.parse(
        request.body
      );

      const updateUserUseCase = container.resolve(UpdateUserUseCase);

      await updateUserUseCase.execute({
        id,
        name,
        email,
        date,
        gender,
      });

      return response.json({
        message: "User updated successfully",
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
        throw new NotFoundError("User not found");
      }
    }
  }
}

export { UpdateUserController };

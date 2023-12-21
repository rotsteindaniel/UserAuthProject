import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { BadRequestError } from "@shared/errors/ApiError";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const token = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.json(token);
    } catch (error) {
        throw new BadRequestError(error.message);
    }
  }
}

export { AuthenticateUserController };

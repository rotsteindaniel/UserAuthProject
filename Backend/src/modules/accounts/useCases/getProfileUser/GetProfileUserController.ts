import { Request, Response } from "express";
import { container } from "tsyringe";
import { NotFoundError } from "@shared/errors/ApiError";

import { GetProfileUserUseCase } from "./GetProfileUserUseCase";

class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;

      const getProfileUserUseCase = container.resolve(GetProfileUserUseCase);

      const { name, email, date, gender } = await getProfileUserUseCase.execute(
        id
      );

      return response.json({
        name,
        email,
        date,
        gender,
      });
    } catch (error) {
      throw new NotFoundError("User not found!");
    }
  }
}

export { GetUserProfileController };

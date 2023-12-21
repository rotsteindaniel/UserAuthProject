import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetProfileUserUseCase } from "./GetProfileUserUseCase";
import { NotFoundError } from "@shared/errors/ApiError";

class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {

    try {
      const { id } = request.user;

      const getProfileUserUseCase = container.resolve(GetProfileUserUseCase);

      // const user = await getProfileUserUseCase.execute(id);
      // return response.json(user);

      const {
        name, email, date, gender
      } = await getProfileUserUseCase.execute(id);

      return response.json({
        name, email, date, gender
      });
    } catch (error) {
      throw new NotFoundError(error.message)     
    }
  }
}

export { GetUserProfileController };


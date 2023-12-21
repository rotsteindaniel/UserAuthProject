import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "@modules/accounts/repositories/User";
import { NotFoundError } from "@shared/errors/ApiError";

@injectable()
class GetProfileUserUseCase {
  constructor(
    @inject("UsersRepositoryInMemory")
    private UsersRepositoryInMemory: IUsersRepository
  ) {}
  async execute(id: string): Promise<User> {
    const user = await this.UsersRepositoryInMemory.findById(id);

    if (!user) {
      throw new NotFoundError("User not found!");
    }

    return user;
  }
}

export { GetProfileUserUseCase };

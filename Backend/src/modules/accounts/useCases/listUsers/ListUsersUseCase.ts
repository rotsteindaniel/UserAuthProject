import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/ApiError";
import { User } from "@sentry/node";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepositoryInMemory")
    private UsersRepositoryInMemory: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    const usersData = await this.UsersRepositoryInMemory.findAll();

    const users = usersData.map((user) => ({
      name: user.name,
      email: user.email,
    }));

    return users;

  }
}

export { ListUsersUseCase };

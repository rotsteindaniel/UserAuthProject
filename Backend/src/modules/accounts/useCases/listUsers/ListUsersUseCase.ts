import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
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
      id: user.id,
      name: user.name,
      email: user.email,
      date: user.date,
      gender: user.gender,
    }));

    return users;
  }
}

export { ListUsersUseCase };

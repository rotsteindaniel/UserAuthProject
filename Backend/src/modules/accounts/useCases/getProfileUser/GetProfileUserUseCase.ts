import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUser } from "@modules/accounts/interfaces/IUser";

@injectable()
class GetProfileUserUseCase {
  constructor(
    @inject("UsersRepositoryInMemory")
    private UsersRepositoryInMemory: IUsersRepository
  ) {}
  async execute(id: string): Promise<IUser> {
    const user = await this.UsersRepositoryInMemory.findById(id);

    return user;
  }
}

export { GetProfileUserUseCase };

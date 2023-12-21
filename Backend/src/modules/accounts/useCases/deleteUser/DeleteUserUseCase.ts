import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@shared/errors/ApiError";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  id: string;
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepositoryInMemory")
    private UsersRepositoryInMemory: IUsersRepository
  ) {}
  async execute({ id }: IRequest): Promise<void> {
    const user = await this.UsersRepositoryInMemory.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }
    
    await this.UsersRepositoryInMemory.delete(id);
  }
}

export { DeleteUserUseCase };

import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { NotFoundError } from "@shared/errors/ApiError";

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

    // Verifique se o usuário existe antes de tentar excluí-lo
    if (!user) {
      // Lançar uma exceção ou retornar uma resposta adequada
      throw new NotFoundError("User not found");
    }

    // Exclua o usuário do repositório
    await this.UsersRepositoryInMemory.delete(id);
  }
}

export { DeleteUserUseCase };

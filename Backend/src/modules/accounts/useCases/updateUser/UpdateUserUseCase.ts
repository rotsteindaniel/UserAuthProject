import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { NotFoundError } from "@shared/errors/ApiError";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepositoryInMemory")
    private UsersRepositoryInMemory: IUsersRepository
  ) {}
  async execute({ id, name, email }: IRequest): Promise<IUserResponseDTO> {
    const user = await this.UsersRepositoryInMemory.findById(id);

    // Verifique se o usuário existe antes de tentar atualizá-lo
    if (!user) {
      // Lançar uma exceção ou retornar uma resposta adequada
      throw new NotFoundError("User not found");
    }

    // Atualize os dados do usuário
    user.name = name;
    user.email = email;

    // Salve o usuário atualizado no repositório
    await this.UsersRepositoryInMemory.save(user);

    return UserMap.toDTO(user);
  }
}

export { UpdateUserUseCase };

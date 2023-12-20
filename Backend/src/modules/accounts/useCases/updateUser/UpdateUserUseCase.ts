import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { NotFoundError } from "@shared/errors/ApiError";
import { IUser } from "@modules/accounts/interfaces/IUser";

interface IRequest {
  id: string;
  name: string;
  email: string;
  date: string;
  gender: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepositoryInMemory")
    private UsersRepositoryInMemory: IUsersRepository
  ) {}
  async execute({ id, name, email, date, gender }: IRequest): Promise<IUser> {
    const user = await this.UsersRepositoryInMemory.findById(id);

    // Verifique se o usuário existe antes de tentar atualizá-lo
    if (!user) {
      // Lançar uma exceção ou retornar uma resposta adequada
      throw new NotFoundError("User not found");
    }

    // Atualize os dados do usuário
    user.name = name;
    user.email = email;
    user.date = date;
    user.gender = gender;

    // Salve o usuário atualizado no repositório
    await this.UsersRepositoryInMemory.save(user);

    return user;
  }
}

export { UpdateUserUseCase };

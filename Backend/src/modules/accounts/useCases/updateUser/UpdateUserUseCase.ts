import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@shared/errors/ApiError";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
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

    if (!user) {
      throw new NotFoundError("User not found");
    }

    user.name = name;
    user.email = email;
    user.date = date;
    user.gender = gender;

    await this.UsersRepositoryInMemory.save(user);

    return user;
  }
}

export { UpdateUserUseCase };

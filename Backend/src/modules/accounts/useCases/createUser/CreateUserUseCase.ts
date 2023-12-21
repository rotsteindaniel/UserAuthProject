import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUser } from "@modules/accounts/interfaces/IUser";
import { BadRequestError } from "@shared/errors/ApiError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepositoryInMemory")
    private UsersRepositoryInMemory: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    date,
    gender,
    password,
  }: IUser): Promise<void> {
    const userAlreadyExists = await this.UsersRepositoryInMemory.findByEmail(
      email
    );

    if (userAlreadyExists) {
      throw new BadRequestError("User already exists");;
    }

    const passwordHash = await hash(password, 8);

    await this.UsersRepositoryInMemory.create({
      name,
      email,
      date,
      gender,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };

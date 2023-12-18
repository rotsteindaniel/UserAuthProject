import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

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
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.UsersRepositoryInMemory.findByEmail(
      email
    );

    if (userAlreadyExists) {
      throw new Error;
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

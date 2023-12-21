import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { BadRequestError } from "@shared/errors/ApiError";

import { sign } from "jsonwebtoken";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import auth from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepositoryInMemory")
    private usersRepositoryInMemory: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepositoryInMemory.findByEmail(email);
    const { expires_in_token, secret_token } = auth;

    if (!user) {
      throw new BadRequestError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestError("Email or password incorrect!");
    }

    let token: string | undefined;

    token = sign({ subject: user.id }, secret_token, {
      expiresIn: expires_in_token,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };

import { container } from "tsyringe";

import "@shared/container/providers";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

container.registerSingleton<IUsersRepository>(
  "UsersRepositoryInMemory",
  UsersRepositoryInMemory
);
